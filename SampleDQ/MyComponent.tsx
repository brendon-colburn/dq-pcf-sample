import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Stack } from '@fluentui/react/lib/Stack';
import * as React from "react";

const options: IChoiceGroupOption[] = [
    { key: 'A', text: 'In' },
    { key: 'B', text: 'Out' },
    { key: 'D', text: 'N/O' },
];

export interface ILineItems {
    value: string | number,
    liLabel: string,
    response: ComponentFramework.WebApi.RetrieveMultipleResponse | null
}

export const MyComponent = React.memo(({ value, liLabel, response }: ILineItems): JSX.Element => {
    if (response == null)
        response = {
            entities: [{
                "cr56f_linetext": "Question 1"
            },
            {
                "cr56f_linetext": "Question 2"
            }], nextLink: ""
        }

    return (
        <>
            <Stack>
                {
                    response?.entities.map(function (e) {
                        return <ChoiceGroup label={e["cr56f_linetext"]} options={options}></ChoiceGroup>
                    })
                }
            </Stack>
        </>
    )
})

