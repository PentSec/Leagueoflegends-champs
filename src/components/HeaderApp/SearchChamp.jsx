import { Input } from '@nextui-org/react'

function SearchChampsComponent({ value, changeValue }) {
    return (
        <Input
            label="Search Champs"
            variant="bordered"
            color="primary"
            radius="lg"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
        />
    )
}

export default SearchChampsComponent
