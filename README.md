# hospedin-tarifario

Calculadora de tarifário hoteleiro desenvolvida como desafio técnico para a Hospedin.

## Iniciando

### Pré-requisitos

- [Node.js](https://nodejs.org/) v24.15.0
- [npm](https://www.npmjs.com/) v11.12.1

> Recomendado usar [Volta](https://volta.sh/) para gerenciar as versões automaticamente.

### Instalação

```bash
git clone https://github.com/amariliodeoliveira/hospedin-tarifario
cd hospedin-tarifario
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts

| Script                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento         |
| `npm run build`        | Gera a versão de produção da aplicação       |
| `npm run start`        | Inicia o servidor em produção                |
| `npm run lint`         | Executa o ESLint                             |
| `npm run format`       | Formata os arquivos com o Prettier           |
| `npm run format:check` | Verifica a formatação sem aplicar alterações |
| `npm run type-check`   | Executa a verificação de tipos do TypeScript |

## Regras Implementadas

### Acomodações

| Acomodação    | Diária    | Limpeza   | Mínimo de noites | Capacidade |
| ------------- | --------- | --------- | ---------------- | ---------- |
| Suíte Jardim  | R$ 300,00 | R$ 80,00  | 2 noites         | 2 adultos  |
| Chalé Família | R$ 450,00 | R$ 100,00 | 2 noites         | 4 adultos  |

### Regras de cálculo

- **Fins de semana** — sábados e domingos têm acréscimo de 20% na diária.
- **Hóspedes extras** — adultos acima da capacidade máxima são cobrados R$ 50 por noite adicional.
- **Desconto de longa estadia** — estadias com mais de 7 noites ganham 10% de desconto sobre o subtotal (diárias + hóspedes extras). A taxa de limpeza não entra no desconto por ser uma taxa fixa.

### Resultado exibido

- Diárias base
- Acréscimo de fim de semana (quando aplicável)
- Hóspedes extras (quando aplicável)
- Desconto de longa estadia (quando aplicável)
- Taxa de limpeza
- Total final

### Validações

- Acomodação não selecionada
- Período não selecionado
- Apenas check-in selecionado sem check-out
- Período abaixo do mínimo de noites da acomodação
- Nenhum hóspede informado

## Decisões Técnicas

### Next.js em vez de React puro

O desafio pede React, mas optei por Next.js por ser o padrão atual do ecossistema React para aplicações em produção. O App Router foi usado apenas para estrutura, sem SSR, rotas ou funcionalidades específicas de Next.js que não existiriam em uma SPA React convencional.

### TypeScript

Adotado para garantir tipagem estrita das regras de negócio, especialmente na `calculateTarifario()` e nas interfaces de `Accommodation` e `TarifarioResult`. Evita erros silenciosos em cálculos financeiros.

Interfaces compartilhadas entre componentes foram extraídas para `src/types/`, evitando duplicação. Por exemplo, `PickerProps` centraliza as props comuns dos três pickers (`onMouseEnter`, `onMouseLeave`, `className`), e cada picker estende essa interface conforme necessário.

Path aliases foram configurados no `tsconfig.json` para tornar os imports mais legíveis e independentes da estrutura de pastas:

```ts
import { Accommodation } from "@data/accommodations";
import FieldButton from "@ui/FieldButton";
import { hidePopover } from "@utils/popover";
```

### Arquitetura de componentes

Os componentes foram divididos em camadas com responsabilidades claras:

- `components/layout/` — componentes de página (Hero, HeroCard e seus componentes)
- `components/ui/` — componentes reutilizáveis sem lógica de negócio (FieldButton, Counter, Alert, BottomSheet)
- `data/` — dados estáticos e regras de negócio (accommodations, tarifarioRules)
- `types/` — interfaces compartilhadas entre componentes
- `utils/` — funções puras e utilitários
- `hooks/` — hooks customizados

O estado do formulário foi elevado para o `HeroCard`, que orquestra os três pickers e dispara o cálculo. Cada picker é controlado via `value`/`onChange`, seguindo o padrão de componentes controlados do React.

### Princípios SOLID

Alguns princípios do SOLID foram aplicados de forma intencional ao longo do projeto:

- **Single Responsibility**: cada componente, função e utilitário tem uma única responsabilidade. `calculateTarifario()` só calcula, `validateTarifarioForm()` só valida, `formatBRL()` só formata moeda.
- **Open/Closed**: `FieldButton` e `Alert` são extensíveis via props (`variant`, `type`) sem necessidade de modificar o componente base.
- **Dependency Inversion**: os pickers não dependem de implementações concretas de estado. Recebem `value` e `onChange` de fora, tornando-os reutilizáveis e testáveis de forma independente.

### calculateTarifario()

Função pura isolada em `utils/calculateTarifario.ts`. Recebe `accommodation`, `range` e `adults` e retorna um objeto `TarifarioResult` com o detalhamento completo do cálculo. Magic numbers foram extraídos como constantes nomeadas para facilitar a leitura e manutenção:

```ts
const WEEKEND_SURCHARGE_RATE = 0.2;
const LONG_STAY_DISCOUNT_RATE = 0.1;
const LONG_STAY_MIN_NIGHTS = 7;
const EXTRA_GUEST_RATE_PER_NIGHT = 50;
```

### Utilitários

Funções puras foram extraídas para `utils/` para evitar duplicação e facilitar o reuso em diferentes partes da aplicação:

- `date.ts` — `addDays`, `countNights`, `formatDateRange`
- `currency.ts` — `formatBRL`
- `string.ts` — `pluralize`, `formatGuests`
- `popover.ts` — `hidePopover`, que abstrai o cast necessário para a Popover API enquanto o TypeScript ainda não oferece suporte nativo
- `validation.ts` — `validateTarifarioForm`
- `calculateTarifario.ts` — lógica principal de cálculo

### Validação sem bibliotecas externas

A validação foi implementada manualmente em `utils/validation.ts` com mensagens de erro extraídas como constantes. Optei por não usar Formik ou Yup para manter a solução simples e alinhada com os requisitos de "hooks e componentização simples".

### Hook useError

Hook customizado que encapsula o estado de erro e o auto-dismiss com `setTimeout`. Ao exibir um novo erro, o timeout anterior é cancelado antes de criar um novo, evitando comportamento inesperado em múltiplas validações consecutivas. A lógica foi extraída para um hook para evitar repetição nos componentes e manter o `HeroCard` focado apenas na orquestração do formulário.

### Hook useIsMobile

Hook customizado que detecta o tamanho da tela via `window.matchMedia`, reagindo a mudanças de viewport em tempo real. Os breakpoints são nomeados e alinhados com os padrões do Tailwind CSS v4. O estado inicial é calculado via lazy initializer no `useState` para evitar cascata de renders desnecessária e garantir compatibilidade com SSR no Next.js.

### Responsividade e BottomSheet

No desktop, os seletores de acomodação, datas e hóspedes abrem como popovers ancorados ao campo correspondente. No mobile, o mesmo conteúdo é exibido em um `BottomSheet` — um componente `ui/` reutilizável que usa o `<dialog>` nativo do HTML com `modal-bottom` do DaisyUI. Essa abordagem mantém a experiência adequada para toque sem duplicar lógica de negócio entre os dois layouts.

### react-day-picker

Utilizado para o seletor de período de datas por oferecer suporte nativo a seleção de intervalos (`mode="range"`), localização em português (`locale={ptBR}`), restrição de datas mínimas e máximas, e mínimo de noites configurável via prop `min`. Evitou a necessidade de implementar um calendário do zero, mantendo o foco na lógica de negócio do tarifário.

### HTML semântico e acessibilidade

A marcação HTML foi escrita com atenção à semântica e acessibilidade:

- Formulário de busca usa `<form>` com `onSubmit` e botão `type="submit"`
- Popovers de seleção usam `role="dialog"` com `aria-label`
- Lista de acomodações usa `role="listbox"` e `role="option"`
- Counter usa `role="group"` com `aria-labelledby` e `aria-live="polite"` no valor
- Botões do Counter têm `aria-label` explícito ("Aumentar", "Diminuir")

### Qualidade de código

- **ESLint** com `eslint-plugin-import` para ordenação semântica de imports
- **Prettier** para formatação consistente
- **Husky** + **lint-staged** para validação no pre-commit
- **CI** com GitHub Actions validando type-check, lint, format e build em todo PR

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-day-picker](https://react-day-picker.js.org/)
- [Heroicons](https://heroicons.com/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)
