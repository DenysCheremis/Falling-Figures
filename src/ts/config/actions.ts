type ActionData = any; 

type ActionFunction = (data: ActionData) => void;

// ACTIONS CLASS FOR CREATING AND CALLING FUNCTIONS FROM DIFFERENT CONTROLLERS 
class Actions {
    private actions: { [action: string]: ActionFunction[] };

    constructor() {
        this.actions = {};
    }

    // CALLS ALL FUNCTIONS ASSOCIATED WITH A SPECIFIC ACTION
    call(action: string, data: ActionData = {}): void {
        const actionFunctions = this.actions[action];
        if (!actionFunctions) {
            return;
        }
        for (let func of actionFunctions) {
            func(data);
        }
    }

    // REGISTERS A NEW FUNCTION FOR A SPECIFIC ACTION
    add(action: string, func: ActionFunction): void {
        if (!this.actions[action]) {
            this.actions[action] = [];
        }
        this.actions[action].push(func);
    }
}

const actions = new Actions();

export default actions;