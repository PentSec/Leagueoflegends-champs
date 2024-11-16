import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

function SelectLang({ languages, setLanguage, value, isLoadingLang, isErrorLang }) {
    if (isErrorLang) {
        console.error(`isErrorLang`, isErrorLang)
    }
    return (
        <Autocomplete
            label="Language"
            className="mb-4"
            isLoading={isLoadingLang}
            selectedKey={value}
            onSelectionChange={(key) => setLanguage(key)}
            defaultItems={languages}
        >
            {languages.map((lang) => (
                <AutocompleteItem key={lang} value={lang}>
                    {lang}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectLang
