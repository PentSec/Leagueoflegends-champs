// import { Select, SelectItem } from '@nextui-org/react'

// const SelectLanes = ({ selectLanes, onChangeValue, value }) => {
//     const lanesArray = Object.keys(selectLanes || {})

//     return (
//         <Select
//             aria-label="Select Lane"
//             className="ml-10"
//             defaultValue={''}
//             value={value}
//             onChange={(e) => onChangeValue(e.target.value)}
//             orientation="horizontal"
//             hideSelectedIcon
//             size="lg"
//         >
//             {lanesArray.map((lane) => (
//                 <SelectItem key={lane} value={lane}>
//                     {lane}
//                 </SelectItem>
//             ))}
//         </Select>
//     )
// }

// export default SelectLanes

import { Checkbox, Avatar, CheckboxGroup, Tooltip } from '@nextui-org/react'
import { laneIcon } from '@/utils'

const SelectLanes = ({ selectLanes, onChangeValue, value }) => {
    const lanesArray = Object.keys(selectLanes || {})

    return (
        <div className="flex flex-row inline-block">
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
                        size="lg"
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
