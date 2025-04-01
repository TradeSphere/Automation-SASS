import { duplicateValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTriggerProps = {
    trigger?: {
        type?: "COMMENT" | "DM"
        keyword?: string
        types?: string[]
        keywords?: string[]
    }
}

//default data for initial state
const InitialState: InitialStateTriggerProps = {
    trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: []
    }
}

export const AUTOMATION = createSlice({
    name: 'automation',
    initialState: InitialState,
    reducers: {
        TRIGGER: (state,action: PayloadAction<InitialStateTriggerProps>) => {
            Final Summary
This Redux slice manages automation triggers (COMMENT/DM).

It prevents duplicate triggers using duplicateValidation.

The TRIGGER function updates the state when a new trigger is added.

 = duplicateValidation(
                state.trigger?.types!,
                action.payload.trigger?.type!
            )
            return state
        },
    }
})


export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.actions