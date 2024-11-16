import { Select, SelectItem } from '@nextui-org/react'

function SelectLang({ languages, setLanguage, value }) {
    return (
        <Select
            label="Idioma"
            className="mb-4"
            value={value}
            onChange={(e) => setLanguage(e.target.value)}
        >
            {languages.map((lang) => (
                <SelectItem key={lang} value={lang} textValue={lang}>
                    {' '}
                    {lang}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectLang
