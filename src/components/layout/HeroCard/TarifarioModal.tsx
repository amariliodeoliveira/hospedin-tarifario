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
  highlight?: boolean;
}

function ResultRow({ label, value, highlight = false }: ResultRowProps) {
  return (
    <div
      className={`flex justify-between py-1 ${highlight ? "text-base font-bold" : "text-sm"}`}
    >
      <span>{label}</span>
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
      <div className="card card-border bg-base-100 border-base-300 card-sm w-11/12 max-w-lg overflow-hidden">
        {result && (
          <>
            <div className="card-title border-base-300 items-center justify-between gap-0 border-b border-dashed p-6 pb-3">
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

            <div className="card-body divide-base-200 gap-4 divide-y p-8">
              <div className="space-y-1 pb-2">
                <ResultRow
                  label="Diárias"
                  value={formatBRL(result.dailiesTotal)}
                />
                {result.weekendSurcharge > 0 && (
                  <ResultRow
                    label="Acréscimo fim de semana"
                    value={formatBRL(result.weekendSurcharge)}
                  />
                )}
                {result.extraGuestFee > 0 && (
                  <ResultRow
                    label={`Hóspedes extras (${result.extraGuests} além do limite de ${result.maxGuests})`}
                    value={formatBRL(result.extraGuestFee)}
                  />
                )}
                <ResultRow
                  label="Taxa de limpeza"
                  value={formatBRL(result.cleaningFee)}
                />
              </div>

              {result.discount > 0 && (
                <div className="pb-3">
                  <ResultRow
                    label="Desconto estadia longa (10%)"
                    value={`-${formatBRL(result.discount)}`}
                  />
                </div>
              )}

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

        <div className="bg-base-300 px-8 py-6">
          <form method="dialog">
            <button className="btn btn-primary btn-block">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
