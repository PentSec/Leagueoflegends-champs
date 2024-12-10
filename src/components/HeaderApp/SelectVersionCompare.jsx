import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const SelectVersionCompare = ({ value, setVersionCompare, currentVersions }) => {
    return (
        <Autocomplete
            label="Compare"
            isVirtualized
            defaultItems={currentVersions}
            selectedKey={value}
            onSelectionChange={(key) => setVersionCompare(key)}
            onInputChange={(text) => setVersionCompare(text)}
            variant="bordered"
            radius="sm"
            size="sm"
            className="w-full lg:w-36"
        >
            {currentVersions.map((version) => (
                <AutocompleteItem key={version} value={version}>
                    {version}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectVersionCompare
