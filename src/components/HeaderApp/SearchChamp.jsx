import { Input } from '@nextui-org/react'

function SearchChampsComponent({ value, changeValue }) {
    return (
        <Input
            label="Search Champs"
            radius="sm"
            size="sm"
            variant="bordered"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
        />
    )
}

export default SearchChampsComponent
