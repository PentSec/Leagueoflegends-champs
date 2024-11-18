import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { LANGUAGE_NAMES } from '@/utils'
import { useEffect } from 'react'

function SelectLang({ languages, setLanguage, value, isLoadingLang, isErrorLang }) {
    const mappedLanguages = languages.map((lang) => ({
        code: lang,
        name: LANGUAGE_NAMES[lang] || lang
    }))

    useEffect(() => {
        const storedLang = localStorage.getItem('selectedLanguage')
        if (storedLang) {
            setLanguage(storedLang)
        }
    }, [setLanguage])

    useEffect(() => {
        if (value) {
            localStorage.setItem('selectedLanguage', value)
        }
    }, [value])

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
            defaultItems={mappedLanguages}
            variant="bordered"
        >
            {mappedLanguages.map(({ code, name }) => (
                <AutocompleteItem key={code} value={code}>
                    {name}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectLang
