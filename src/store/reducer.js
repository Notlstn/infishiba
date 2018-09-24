import db from "../db";

const initState = {
    menuOpened: false,
    modalOpened: false,
    modalImageSrc: null,
    isAuth: false,
    authLogin: null,
    authId: null
};

const _logout = state => {
    localStorage.removeItem("login");
    localStorage.removeItem("id");
    return {
        ...state,
        isAuth: false,
        authLogin: null,
        authId: null
    };
};
const reducer = (state = initState, action) => {
    if (action.type === "CHANGE_MENU_STATE") {
        return {
            ...state,
            menuOpened: action.state !== undefined ? action.state : !state.menuOpened
        };
    }

    if (action.type === "CHANGE_MODAL_STATE") {
        let imageSrc = action.src;
        return {
            ...state,
            modalOpened: !state.modalOpened,
            modalImageSrc: imageSrc
        };
    }

    if (action.type === "LOG_OUT") {
        return _logout(state);
    }

    if (action.type === "TRY_AUTH") {
        // Jest to bardzo naiwny system logowania, stworzony na potrzeby działania formularza.
        // Jeżeli user nie istnieje w bazie, zostanie dodany i zalogowany.
        // Jeżeli user istnieje w bazie, zostanie zalogowany.
        db.users
            .get({
                login: action.login,
                password: action.passphase
            })
            .then(record => {
                //Użytkownik istnieje w bazie dancyh, więc go logujemy.
                localStorage.setItem("login", record.login);
                localStorage.setItem("id", record.id);
                return {
                    ...state,
                    isAuth: true,
                    authLogin: record.login,
                    authId: record.id
                };
            })
            .catch(() => {
                //Użytkownik nie istnieje, więc go dodajemy i logujemy
                db.users.put({
                    login: action.login,
                    password: action.passphase
                });

                db.users
                    .get({
                        login: action.login,
                        password: action.passphase
                    })
                    .then(record => {
                        localStorage.setItem("login", record.login);
                        localStorage.setItem("id", record.id);
                        return {
                            ...state,
                            isAuth: true,
                            authLogin: record.login,
                            authId: record.id
                        };
                    });
            });
    }

    if (action.type === "TRY_AUTO_AUTH") {
        const login = localStorage.getItem("login");
        const id = localStorage.getItem("id");
        if (login && id) {
            return {
                ...state,
                isAuth: true,
                authLogin: login,
                authId: id
            };
        } else {
            return _logout(state);
        }
    }

    return state;
};

export default reducer;
