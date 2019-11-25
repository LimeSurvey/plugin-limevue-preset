export default {
    toggleLoading: (state, force == null) => {
        state.loading = (force !== null) ? force : !state.loading;
    }
}