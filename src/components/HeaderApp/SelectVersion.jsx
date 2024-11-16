import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'

function SelectVersion({ versions, setVersion, value, isLoadingVer, isErrorVer }) {
    const [visibleVersions, setVisibleVersions] = useState([])
    const [itemsToShow, setItemsToShow] = useState(50)
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (query) {
            setVisibleVersions(
                versions.filter((version) => version.toLowerCase().includes(query.toLowerCase()))
            )
        } else {
            setVisibleVersions(versions.slice(0, itemsToShow))
        }
    }, [versions, itemsToShow, query])

    const loadMore = () => {
        if (!query) {
            setItemsToShow((prev) => prev + 10)
        }
    }

    const hasMore = query ? false : itemsToShow < versions.length

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: loadMore
    })

    if (isErrorVer) {
        console.error(`isErrorVer`, isErrorVer)
    }

    return (
        <Autocomplete
            label="Version"
            className="mb-4"
            isLoading={isLoadingVer}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            selectedKey={value}
            onSelectionChange={(key) => setVersion(key)}
            onInputChange={(text) => setQuery(text)}
            defaultItems={visibleVersions}
        >
            {visibleVersions.map((item) => (
                <AutocompleteItem key={item} value={item} textValue={item}>
                    {item}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectVersion