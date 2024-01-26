export const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1, showText: state.showText }
        case 'toggleShowText':
            return { count: state.count, showText: !state.showText }
        default:
            return state
    }
}