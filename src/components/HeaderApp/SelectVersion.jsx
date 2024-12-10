import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useEffect } from 'react'

function SelectVersion({ versions, setVersion, value, isLoadingVer, isErrorVer }) {
    useEffect(() => {
        const storedVersion = localStorage.getItem('selectedVersion')
        if (storedVersion) {
            setVersion(storedVersion)
        }
    }, [setVersion])

    if (isErrorVer) {
        console.error(`isErrorVer`, isErrorVer)
    }

    return (
        <Autocomplete
            label="Version"
            isVirtualized
            isLoading={isLoadingVer}
            selectedKey={value}
            onSelectionChange={(key) => setVersion(key)}
            onInputChange={(text) => setVersion(text)}
            defaultItems={versions}
            variant="bordered"
            radius="sm"
            size="sm"
            className="w-full lg:w-36"
        >
            {versions.map((item) => (
                <AutocompleteItem key={item} value={item} textValue={item}>
                    {item}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectVersion
