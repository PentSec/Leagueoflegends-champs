import { Checkbox, Avatar, CheckboxGroup, Tooltip } from '@nextui-org/react'
import { laneIcon } from '@/utils'

const SelectLanes = ({ selectLanes, onChangeValue, value }) => {
    const lanesArray = Object.keys(selectLanes || {})

    return (
        <div className="flex flex-row">
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
                                className="flex-shrink-0 w-7 h-7 text-tiny"
                            />
                        </Tooltip>
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    )
}

export default SelectLanes
