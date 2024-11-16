import { Select, SelectItem } from '@nextui-org/react'

function SelectVersion({ versions, setVersion, value }) {
    return (
        <Select
            label="Versión"
            className="mb-4"
            value={value}
            onChange={(e) => setVersion(e.target.value)}
        >
            {versions.map((ver) => (
                <SelectItem key={ver} value={ver} textValue={ver}>
                    {' '}
                    {ver}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectVersion
