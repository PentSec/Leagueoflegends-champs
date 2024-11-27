import React from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { useState, useEffect } from 'react'

const SelectVersionCompare = ({ value, setVersionCompare, currentVersions }) => {
    const [visibleVersions, setVisibleVersions] = useState([])
    const [itemsToShow, setItemsToShow] = useState(10)
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (query) {
            setVisibleVersions(
                currentVersions.filter((version) =>
                    version.toLowerCase().includes(query.toLowerCase())
                )
            )
        } else {
            setItemsToShow(10)
            setVisibleVersions(currentVersions.slice(0, itemsToShow))
        }
    }, [currentVersions, itemsToShow, query])

    const loadMore = () => {
        if (!query) {
            setItemsToShow((prev) => prev + 10)
        }
    }

    const hasMore = query ? false : itemsToShow < currentVersions.length

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: loadMore
    })

    return (
        <Autocomplete
            label="Version"
            onInputChange={(text) => setQuery(text)}
            defaultItems={visibleVersions}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            selectedKey={value}
            onSelectionChange={(key) => setVersionCompare(key)}
            variant="bordered"
            radius="sm"
            size="sm"
            className="w-full lg:w-36"
        >
            {visibleVersions.map((version) => (
                <AutocompleteItem key={version} value={version}>
                    {version}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default SelectVersionCompare
