export type HostvibeLocaleOption = {
  language: string;
  localisedName: string;
};

export type HostvibeCurrencyOption = {
  id: string | number;
  prefix: string;
  code: string;
};

export type HostvibeIncludeModalChooseLanguageProps = {
  action: string;
  activeLanguage?: string;
  locales?: HostvibeLocaleOption[];
  selectedCurrency?: string | number;
  currencies?: HostvibeCurrencyOption[];
  showCurrency?: boolean;
  className?: string;
};

export default function HostvibeIncludeModalChooseLanguage({
  action,
  activeLanguage,
  locales = [],
  selectedCurrency,
  currencies = [],
  showCurrency,
  className,
}: HostvibeIncludeModalChooseLanguageProps) {
  return (
    <form method="get" action={action} className={className}>
      <div className="modal modal-localisation" id="modalChooseLanguage" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              {locales.length > 1 ? (
                <>
                  <h5 className="h5 pt-5 pb-3">Choose language</h5>
                  <div className="row item-selector">
                    <input type="hidden" name="language" data-current={activeLanguage} defaultValue={activeLanguage} />
                    {locales.map((locale) => (
                      <div className="col-6 col-md-4" key={locale.language}>
                        <a href="#" className={`item ${activeLanguage === locale.language ? "active" : ""}`.trim()} data-value={locale.language}>{locale.localisedName}</a>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {showCurrency && currencies.length ? (
                <>
                  <p className="h5 pt-5 pb-3">Choose currency</p>
                  <div className="row item-selector">
                    <input type="hidden" name="currency" data-current={String(selectedCurrency ?? "")} defaultValue="" />
                    {currencies.map((currency) => (
                      <div className="col-6 col-md-4" key={currency.id}>
                        <a href="#" className={`item ${selectedCurrency === currency.id ? "active" : ""}`.trim()} data-value={currency.id}>{currency.prefix} {currency.code}</a>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-default">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
