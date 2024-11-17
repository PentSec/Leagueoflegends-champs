import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import { roleIcon } from '@/components'

const FilterRoleChamp = ({ value, key, setSelectedRole }) => {
    const options = ['All', ...value]

    const handleSelectionChange = (selected) => {
        setSelectedRole(selected === 'All' ? null : selected)
    }

    return (
        <Autocomplete
            defaultItems={options}
            onSelectionChange={handleSelectionChange}
            selectedKey={key}
            aria-label="Filter by Role"
            className="mb-4"
            size="lg"
            variant="bordered"
            placeholder="Select Roles"
            radius="md"
        >
            {options.map((role) => (
                <AutocompleteItem key={role} textValue={role}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {role !== 'All' && (
                                <Avatar
                                    src={roleIcon[role]}
                                    size="sm"
                                    alt={role}
                                    className="flex-shrink-0"
                                />
                            )}
                            <div className="flex flex-col">
                                <span className="text-small">
                                    {role === 'All' ? 'All Roles' : role}
                                </span>
                            </div>
                        </div>
                    </div>
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default FilterRoleChamp
