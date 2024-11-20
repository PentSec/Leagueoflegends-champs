import { Input } from '@nextui-org/react'

function SearchChamps({ value, changeValue }) {
    return (
        <Input
            label="Search Champs"
            radius="sm"
            size="sm"
            variant="bordered"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
            className="w-36"
        />
    )
}

export default SearchChamps
