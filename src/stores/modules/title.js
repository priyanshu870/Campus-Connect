// const TitleModule = {
//     namespaced: true,
//     state() {
//         return {
//             title: "Welcome",
//         };
//     },
//     getters: {
//         pageTitle(state) {
//             return state.title;
//         },
//     },
//     mutations: {
//         setTitle(state, title) {
//             state.title = title + " | Facebook";
        
//             document.title = state.title;
//         },
//     },
//     actions: {
//         setPageTitle({ commit, state }, title) {
//             commit("setTitle", title);
//         },
//     },
// };

// export default TitleModule;