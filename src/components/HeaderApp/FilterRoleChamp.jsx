import { Checkbox, Avatar, CheckboxGroup, Tooltip, AvatarGroup } from '@nextui-org/react'
import { roleIcon } from '@/utils'
import { useState } from 'react'

const FilterRoleChamp = ({ value, key, setSelectedRole }) => {
    const [selectedRole, setSelectedRoleLocal] = useState(key)

    const handleSelectionChange = (selected) => {
        const newSelectedRole = selected[0]
        setSelectedRoleLocal(newSelectedRole)
        setSelectedRole(newSelectedRole)
    }

    return (
        <CheckboxGroup
            aria-label="Filter by Role"
            defaultValue={key}
            onChange={handleSelectionChange}
            orientation="horizontal"
            hideSelectedIcon
        >
            {value.map((role) => (
                <Checkbox
                    key={role}
                    value={role}
                    size="sm"
                    className="gap-0 p-0"
                    classNames={{
                        base: 'm-0',
                        wrapper: 'hidden',
                        label: 'm-0 p-0'
                    }}
                >
                    <Tooltip content={role}>
                        <Avatar
                            isBordered={selectedRole === role}
                            src={roleIcon[role]}
                            alt={role}
                            radius="sm"
                            className="flex-shrink-0 transition duration-300 ease-in-out scale-125 bg-transparent w-7 h-7 hover:-translate-y-1 hover:scale-150"
                        />
                    </Tooltip>
                </Checkbox>
            ))}
        </CheckboxGroup>
    )
}

export default FilterRoleChamp
