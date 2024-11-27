import { Checkbox, Avatar, CheckboxGroup, Tooltip } from '@nextui-org/react'
import { laneIcon } from '@/utils'

const SelectLanes = ({ selectLanes, onChangeValue, value }) => {
    const lanesArray = Object.keys(selectLanes || {})

    return (
        <CheckboxGroup
            aria-label="Select Lane"
            defaultValue={''}
            onChange={(selected) => onChangeValue(selected[0])}
            orientation="horizontal"
            hideSelectedIcon
        >
            {lanesArray.map((lane) => (
                <Checkbox
                    key={lane}
                    value={lane}
                    className="gap-0 p-0"
                    classNames={{
                        base: 'm-0',
                        wrapper: 'hidden',
                        label: 'm-0 p-0'
                    }}
                >
                    <Tooltip content={lane}>
                        <Avatar
                            isBordered={value === lane}
                            src={laneIcon[lane]}
                            alt={lane}
                            radius="sm"
                            className="flex-shrink-0 transition duration-300 ease-in-out bg-transparent w-7 h-7 hover:-translate-y-1 hover:scale-125"
                        />
                    </Tooltip>
                </Checkbox>
            ))}
        </CheckboxGroup>
    )
}

export default SelectLanes
