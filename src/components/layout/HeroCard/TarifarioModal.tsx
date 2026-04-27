import { TARIFARIO_RULES } from "@data/tarifarioRules";
import { TarifarioResult } from "@utils/calculateTarifario";
import { formatBRL } from "@utils/currency";
import { pluralize } from "@utils/string";

interface Props {
  id: string;
  result: TarifarioResult | null;
}

interface ResultRowProps {
  label: string;
  value: string;
  description?: string;
  highlight?: boolean;
}

function ResultRow({
  label,
  value,
  description,
  highlight = false,
}: ResultRowProps) {
  return (
    <div
      className={`flex justify-between py-1 ${highlight ? "text-base font-bold" : "text-sm"}`}
    >
      <div>
        <span>{label}</span>
        {description && (
          <p className="text-base-content/40 text-xs">{description}</p>
        )}
      </div>
      <span>{value}</span>
    </div>
  );
}

export function TarifarioModal({ id, result }: Props) {
  const badges = result
    ? [
        pluralize(result.nights, "noite", "noites"),
        pluralize(result.adults, "hóspede", "hóspedes"),
      ]
    : [];

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="card card-border bg-base-100 border-base-300 card-sm w-full overflow-hidden rounded-b-none rounded-t-2xl sm:w-11/12 sm:max-w-lg sm:rounded-2xl">
        {result && (
          <>
            <div className="card-title border-base-300 items-center justify-between gap-0 border-b border-dashed p-4 pb-3 sm:p-6">
              <h3 className="mb-1 text-lg font-bold">
                {result.accommodationName}
              </h3>
              <div className="flex gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="badge badge-dash badge-sm badge-secondary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-body divide-base-200 divide-y p-4 sm:p-8">
              <div className="space-y-1 pb-2">
                <ResultRow
                  label="Diárias"
                  value={formatBRL(result.dailiesBase)}
                />
                {result.weekendSurcharge > 0 && (
                  <ResultRow
                    label="Acréscimo fim de semana"
                    value={formatBRL(result.weekendSurcharge)}
                    description={TARIFARIO_RULES.weekendSurcharge}
                  />
                )}
                {result.extraGuestFee > 0 && (
                  <ResultRow
                    label={`Hóspedes extras (${result.extraGuests} além do limite de ${result.maxGuests})`}
                    value={formatBRL(result.extraGuestFee)}
                    description={TARIFARIO_RULES.extraGuest}
                  />
                )}
              </div>

              {result.discount > 0 && (
                <div className="pb-3">
                  <ResultRow
                    label="Desconto estadia longa (10%)"
                    value={`-${formatBRL(result.discount)}`}
                    description={TARIFARIO_RULES.longStayDiscount}
                  />
                </div>
              )}

              <div className="py-3">
                <ResultRow
                  label="Taxa de limpeza"
                  value={formatBRL(result.cleaningFee)}
                />
              </div>

              <div>
                <ResultRow
                  label="Total"
                  value={formatBRL(result.total)}
                  highlight
                />
              </div>
            </div>
          </>
        )}

        <div className="bg-base-300 px-4 py-4 sm:px-8 sm:py-6">
          <form method="dialog">
            <button className="btn btn-primary btn-block">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
