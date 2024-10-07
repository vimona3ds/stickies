"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkstickies"] = self["webpackChunkstickies"] || []).push([["main"],{

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://stickies/./src/index.scss?");

/***/ }),

/***/ "./src/game/actions.ts":
/*!*****************************!*\
  !*** ./src/game/actions.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameActionType = void 0;\nvar GameActionType;\n(function (GameActionType) {\n    GameActionType[\"SET_READY\"] = \"SET_READY\";\n    GameActionType[\"START_PLAYING\"] = \"START_PLAYING\";\n    GameActionType[\"PROCESS_INPUT\"] = \"PROCESS_INPUT\";\n    GameActionType[\"SHOW_RESULTS\"] = \"SHOW_RESULTS\";\n})(GameActionType || (exports.GameActionType = GameActionType = {}));\n\n\n//# sourceURL=webpack://stickies/./src/game/actions.ts?");

/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nconst createGameState_1 = __webpack_require__(/*! ../utils/createGameState */ \"./src/utils/createGameState.ts\");\nconst reducer_1 = __webpack_require__(/*! ./reducer */ \"./src/game/reducer.ts\");\nclass Game {\n    state;\n    constructor(config) {\n        this.state = (0, createGameState_1.createGameState)(config);\n    }\n    dispatch(action) {\n        this.state = (0, reducer_1.reduceGameState)(this.state, action);\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack://stickies/./src/game/index.ts?");

/***/ }),

/***/ "./src/game/reducer.ts":
/*!*****************************!*\
  !*** ./src/game/reducer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.reduceGameState = reduceGameState;\nconst actions_1 = __webpack_require__(/*! ./actions */ \"./src/game/actions.ts\");\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/game/types.ts\");\nconst UNDEFINED_CHAR = '';\nfunction reduceGameState(state, action) {\n    switch (action.type) {\n        case actions_1.GameActionType.SET_READY:\n            if (state.status !== types_1.GameStatus.LOADING) {\n                return state;\n            }\n            return {\n                ...state,\n                status: types_1.GameStatus.READY,\n            };\n        case actions_1.GameActionType.START_PLAYING:\n            if (state.status !== types_1.GameStatus.READY) {\n                return state;\n            }\n            return {\n                ...state,\n                status: types_1.GameStatus.PLAYING,\n                startTime: Date.now(),\n                tokenIndex: 0,\n                tokenContentIndex: 0,\n                lastInputIncorrect: false,\n                mistakes: 0,\n            };\n        case actions_1.GameActionType.PROCESS_INPUT:\n            if (state.status !== types_1.GameStatus.PLAYING) {\n                return state;\n            }\n            const { content } = state.config.tokens[state.tokenIndex];\n            const { input } = action;\n            // pad input so that it is at least the lengthof token Content\n            const paddedInput = [...input]\n                .concat(Array.from({ length: content.length - input.length }, () => UNDEFINED_CHAR));\n            // find first index where input does not match token Content\n            const nextContentIndex = paddedInput\n                .map((char, index) => char === content[index])\n                .findIndex(correct => !correct);\n            if (nextContentIndex === -1) {\n                // move to next token\n                const nextTokenIndex = state.tokenIndex + 1;\n                if (nextTokenIndex === state.config.tokens.length) {\n                    return {\n                        ...state,\n                        status: types_1.GameStatus.RESULTS,\n                        endTime: Date.now()\n                    };\n                }\n                return {\n                    ...state,\n                    tokenIndex: nextTokenIndex,\n                    tokenContentIndex: 0,\n                    lastInputIncorrect: false,\n                };\n            }\n            const mistakeWasMade = paddedInput[nextContentIndex] !== UNDEFINED_CHAR;\n            return {\n                ...state,\n                tokenContentIndex: nextContentIndex,\n                lastInputIncorrect: mistakeWasMade,\n                mistakes: state.mistakes + (mistakeWasMade ? 1 : 0),\n            };\n        case actions_1.GameActionType.SHOW_RESULTS:\n            if (state.status !== types_1.GameStatus.PLAYING) {\n                return state;\n            }\n            return {\n                ...state,\n                status: types_1.GameStatus.RESULTS,\n                endTime: Date.now(),\n            };\n        default:\n            return state;\n    }\n}\n\n\n//# sourceURL=webpack://stickies/./src/game/reducer.ts?");

/***/ }),

/***/ "./src/game/types.ts":
/*!***************************!*\
  !*** ./src/game/types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n// prob move to reducer.ts\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameStatus = void 0;\nvar GameStatus;\n(function (GameStatus) {\n    GameStatus[\"LOADING\"] = \"LOADING\";\n    GameStatus[\"READY\"] = \"READY\";\n    GameStatus[\"PLAYING\"] = \"PLAYING\";\n    GameStatus[\"RESULTS\"] = \"RESULTS\";\n})(GameStatus || (exports.GameStatus = GameStatus = {}));\n\n\n//# sourceURL=webpack://stickies/./src/game/types.ts?");

/***/ }),

/***/ "./src/gameGrid/index.ts":
/*!*******************************!*\
  !*** ./src/gameGrid/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameGrid = void 0;\nconst actions_1 = __webpack_require__(/*! ../game/actions */ \"./src/game/actions.ts\");\nconst types_1 = __webpack_require__(/*! ../game/types */ \"./src/game/types.ts\");\nconst copyToClipboard_1 = __webpack_require__(/*! ../utils/copyToClipboard */ \"./src/utils/copyToClipboard.ts\");\nconst getGameResults_1 = __webpack_require__(/*! ../utils/getGameResults */ \"./src/utils/getGameResults.ts\");\nconst getGameSummary_1 = __webpack_require__(/*! ../utils/getGameSummary */ \"./src/utils/getGameSummary.ts\");\nconst gameStatusToClassNameMap = {\n    [types_1.GameStatus.LOADING]: 'game-loading',\n    [types_1.GameStatus.READY]: 'game-ready',\n    [types_1.GameStatus.PLAYING]: 'game-playing',\n    [types_1.GameStatus.RESULTS]: 'game-results',\n};\nfunction handleCharElementPerTokenLayout(charElement, i, layout) {\n    switch (layout.type) {\n        case \"direction\":\n            const { initialPosition: { x, y }, direction: { x: dx, y: dy } } = layout;\n            charElement.style.gridArea = `${1 + y + dy * i} / ${1 + x + dx * i} / span 1 / span 1`;\n            return;\n    }\n}\nclass GameGrid {\n    game;\n    gameElements;\n    tokenElements;\n    charElementMatrix;\n    countingDown;\n    lastInputValue;\n    resultsInterval;\n    constructor(game, gameElements) {\n        this.game = game;\n        this.gameElements = gameElements;\n        this.tokenElements = [];\n        this.charElementMatrix = [];\n        this.countingDown = false;\n        this.lastInputValue = \"\";\n        const { state: { config: { rows, cols } } } = game;\n        // set up grid\n        gameElements.gridElement.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;\n        this.createTokenAndCharElements();\n        this.createEventListeners();\n        game.dispatch({ type: actions_1.GameActionType.SET_READY });\n    }\n    createTokenAndCharElements() {\n        const { game: { state: { config: { tokens } } }, gameElements: { gridElement } } = this;\n        for (const token of tokens) {\n            const { layout, content } = token;\n            const matrixRow = [];\n            const tokenElement = document.createElement('div');\n            tokenElement.classList.add('token');\n            for (let i = 0; i < content.length; i++) {\n                const char = content[i];\n                const charElement = document.createElement('span');\n                charElement.classList.add(\"char\");\n                charElement.textContent = char;\n                tokenElement.appendChild(charElement);\n                handleCharElementPerTokenLayout(charElement, i, layout);\n                matrixRow.push(charElement);\n            }\n            gridElement.appendChild(tokenElement);\n            this.tokenElements.push(tokenElement);\n            this.charElementMatrix.push(matrixRow);\n        }\n    }\n    async countDown() {\n        this.countingDown = true;\n        const { gameElements: { descriptionElement } } = this;\n        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));\n        descriptionElement.textContent = \"3\";\n        await wait(1000);\n        descriptionElement.textContent = \"2\";\n        await wait(1000);\n        descriptionElement.textContent = \"1\";\n        await wait(1000);\n        this.countingDown = false;\n    }\n    createEventListeners() {\n        const { game, gameElements: { inputElement, shareElement } } = this;\n        window.addEventListener('keydown', () => {\n            inputElement.focus();\n        });\n        inputElement.addEventListener('focus', async () => {\n            this.updateBodyClassNames();\n            if (game.state.status !== types_1.GameStatus.READY || this.countingDown) {\n                return;\n            }\n            await this.countDown();\n            game.dispatch({ type: actions_1.GameActionType.START_PLAYING });\n            inputElement.focus();\n            this.update();\n        });\n        inputElement.addEventListener('blur', () => {\n            this.update();\n        });\n        inputElement.addEventListener('input', () => {\n            if (game.state.status !== types_1.GameStatus.PLAYING) {\n                return;\n            }\n            if (inputElement.value.length < this.lastInputValue.length) {\n                inputElement.value = this.lastInputValue;\n            }\n            game.dispatch({ type: actions_1.GameActionType.PROCESS_INPUT, input: inputElement.value });\n            this.update();\n            this.lastInputValue = inputElement.value;\n        });\n        shareElement.addEventListener('click', () => {\n            (0, copyToClipboard_1.copyToClipboard)((0, getGameSummary_1.getGameSummary)(game.state));\n            shareElement.textContent = \"copied to clipboard\";\n            setTimeout(() => {\n                shareElement.textContent = \"share results\";\n            }, 1500);\n        });\n    }\n    updateInputElement() {\n        const { game: { state }, gameElements: { inputElement } } = this;\n        if (state.status === types_1.GameStatus.PLAYING) {\n            // trim errors\n            inputElement.value = inputElement.value.slice(0, state.tokenContentIndex);\n        }\n        else if (state.status === types_1.GameStatus.RESULTS) {\n            inputElement.setAttribute(\"disabled\", \"\");\n        }\n    }\n    updateCursorPosition() {\n        const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;\n        if (state.status !== types_1.GameStatus.PLAYING) {\n            return;\n        }\n        const { tokenIndex, tokenContentIndex } = state;\n        const charElement = charElementMatrix[tokenIndex][tokenContentIndex];\n        // update cursor position\n        const { top, left, width, height } = charElement.getBoundingClientRect();\n        cursorElement.style.top = `${top + height / 2}px`;\n        cursorElement.style.left = `${left + width / 2}px`;\n    }\n    updateBodyClassNames() {\n        const { game: { state }, gameElements: { inputElement } } = this;\n        for (const className of Object.values(gameStatusToClassNameMap)) {\n            document.body.classList.remove(className);\n        }\n        const newClassName = gameStatusToClassNameMap[state.status];\n        if (newClassName) {\n            document.body.classList.add(newClassName);\n        }\n        if (document.activeElement === inputElement) {\n            document.body.classList.add(\"keyboard-open\");\n        }\n        else {\n            document.body.classList.remove(\"keyboard-open\");\n        }\n    }\n    updateGameElementsClassNames() {\n        this.updateBodyClassNames();\n        const { game: { state }, gameElements: { cursorElement }, charElementMatrix } = this;\n        if (state.status !== types_1.GameStatus.PLAYING) {\n            return;\n        }\n        const { tokenIndex, tokenContentIndex, lastInputIncorrect } = state;\n        const charElement = charElementMatrix[tokenIndex][tokenContentIndex];\n        const { config: { tokens } } = state;\n        const { errorsShown } = tokens[tokenIndex];\n        for (let i = 0; i <= tokenIndex; i++) {\n            const { highlightedWhenCorrect } = tokens[i];\n            if (!highlightedWhenCorrect) {\n                continue;\n            }\n            if (i < tokenIndex) {\n                for (let j = 0; j < charElementMatrix[i].length; j++) {\n                    charElementMatrix[i][j].classList.add(\"highlighted\");\n                    charElementMatrix[i][j].classList.remove(\"incorrect\");\n                }\n            }\n            else if (i === tokenIndex) {\n                for (let j = 0; j < tokenContentIndex; j++) {\n                    charElementMatrix[i][j].classList.add(\"highlighted\");\n                    charElementMatrix[i][j].classList.remove(\"incorrect\");\n                }\n            }\n        }\n        if (errorsShown) {\n            if (lastInputIncorrect) {\n                charElement.classList.add(\"incorrect\");\n                cursorElement.classList.add(\"incorrect\");\n            }\n            else {\n                charElement.classList.remove(\"incorrect\");\n                cursorElement.classList.remove(\"incorrect\");\n            }\n        }\n    }\n    updateResultsElement() {\n        const { game: { state }, gameElements: { speedElement, mistakesElement } } = this;\n        const updateResults = () => {\n            const { speed, mistakes } = (0, getGameResults_1.getGameResults)(this.game.state);\n            speedElement.textContent = speed;\n            mistakesElement.textContent = mistakes;\n        };\n        if (state.status === types_1.GameStatus.PLAYING && !this.resultsInterval) {\n            this.resultsInterval = setInterval(updateResults, 50);\n        }\n        if (state.status === types_1.GameStatus.RESULTS) {\n            if (this.resultsInterval) {\n                clearInterval(this.resultsInterval);\n            }\n            updateResults();\n        }\n    }\n    update() {\n        this.updateInputElement();\n        this.updateCursorPosition();\n        this.updateGameElementsClassNames();\n        this.updateResultsElement();\n    }\n}\nexports.GameGrid = GameGrid;\n\n\n//# sourceURL=webpack://stickies/./src/gameGrid/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/game/index.ts\");\nconst createToken_1 = __webpack_require__(/*! ./utils/createToken */ \"./src/utils/createToken.ts\");\nconst isGameElements_1 = __webpack_require__(/*! ./utils/isGameElements */ \"./src/utils/isGameElements.ts\");\nconst gameGrid_1 = __webpack_require__(/*! ./gameGrid */ \"./src/gameGrid/index.ts\");\n__webpack_require__(/*! ./index.scss */ \"./src/index.scss\");\nconst threeLetterWords = [\"bat\", \"cat\", \"sat\", \"fat\", \"ate\", \"eat\", \"but\", \"act\", \"set\", \"run\", \"far\", \"car\", \"rat\", \"set\"];\nconst twoLetterWords = [\"at\", \"be\", \"do\", \"go\", \"he\", \"in\", \"it\", \"me\", \"my\", \"no\", \"of\", \"on\", \"or\", \"so\", \"to\", \"up\", \"us\", \"we\"];\nconst randomElementFrom = (array) => array[Math.floor(Math.random() * array.length)];\nconst config = {\n    id: 0,\n    rows: 3,\n    cols: 3,\n    tokens: [\n        (0, createToken_1.createToken)({\n            content: randomElementFrom(twoLetterWords),\n            layout: {\n                type: \"direction\",\n                initialPosition: { x: 0, y: 1 },\n                direction: { x: 1, y: 1 },\n            },\n        }),\n        (0, createToken_1.createToken)({\n            content: randomElementFrom(threeLetterWords),\n            layout: {\n                type: \"direction\",\n                initialPosition: { x: 2, y: 2 },\n                direction: { x: -1, y: -1 },\n            },\n        }),\n        (0, createToken_1.createToken)({\n            content: randomElementFrom(twoLetterWords),\n            layout: {\n                type: \"direction\",\n                initialPosition: { x: 1, y: 0 },\n                direction: { x: 1, y: 1 },\n            },\n        }),\n    ]\n};\nwindow.addEventListener('load', () => {\n    const gameElements = {\n        gridElement: document.querySelector('.grid'),\n        cursorElement: document.querySelector('.cursor'),\n        inputElement: document.querySelector('.input'),\n        descriptionElement: document.querySelector('.description'),\n        resultsElement: document.querySelector('.results'),\n        speedElement: document.querySelector('.speed'),\n        mistakesElement: document.querySelector('.mistakes'),\n        shareElement: document.querySelector('.share'),\n    };\n    if (!(0, isGameElements_1.isGameElements)(gameElements)) {\n        return;\n    }\n    new gameGrid_1.GameGrid(new game_1.Game(config), gameElements);\n});\n\n\n//# sourceURL=webpack://stickies/./src/index.ts?");

/***/ }),

/***/ "./src/utils/copyToClipboard.ts":
/*!**************************************!*\
  !*** ./src/utils/copyToClipboard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.copyToClipboard = copyToClipboard;\nfunction copyToClipboard(text) {\n    const el = document.createElement(\"textarea\");\n    el.value = text;\n    document.body.appendChild(el);\n    el.select();\n    document.execCommand(\"copy\");\n    document.body.removeChild(el);\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/copyToClipboard.ts?");

/***/ }),

/***/ "./src/utils/createGameState.ts":
/*!**************************************!*\
  !*** ./src/utils/createGameState.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createGameState = createGameState;\nconst types_1 = __webpack_require__(/*! ../game/types */ \"./src/game/types.ts\");\nfunction createGameState(config) {\n    return {\n        status: types_1.GameStatus.LOADING,\n        config,\n    };\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/createGameState.ts?");

/***/ }),

/***/ "./src/utils/createToken.ts":
/*!**********************************!*\
  !*** ./src/utils/createToken.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createToken = createToken;\nfunction createToken(partialToken) {\n    return {\n        content: '',\n        layout: {\n            type: 'direction',\n            initialPosition: { x: 0, y: 0 },\n            direction: { x: 1, y: 0 },\n        },\n        hiddenUntilCorrect: false,\n        highlightedWhenCorrect: true,\n        errorsShown: true,\n        ...partialToken,\n    };\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/createToken.ts?");

/***/ }),

/***/ "./src/utils/getGameResults.ts":
/*!*************************************!*\
  !*** ./src/utils/getGameResults.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getGameResults = getGameResults;\nconst types_1 = __webpack_require__(/*! ../game/types */ \"./src/game/types.ts\");\nfunction getGameResults(state) {\n    const { status } = state;\n    const endTime = status === types_1.GameStatus.RESULTS ? state.endTime : Date.now();\n    const startTime = (status === types_1.GameStatus.RESULTS || status === types_1.GameStatus.PLAYING) ? state.startTime : endTime;\n    const speed = (endTime - startTime) / 1000;\n    const mistakes = (status === types_1.GameStatus.RESULTS || status === types_1.GameStatus.PLAYING) ? state.mistakes : 0;\n    return {\n        speed: `${speed.toFixed(2)}s`,\n        mistakes: `${mistakes} errors`\n    };\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/getGameResults.ts?");

/***/ }),

/***/ "./src/utils/getGameSummary.ts":
/*!*************************************!*\
  !*** ./src/utils/getGameSummary.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getGameSummary = getGameSummary;\nconst getGameResults_1 = __webpack_require__(/*! ./getGameResults */ \"./src/utils/getGameResults.ts\");\nfunction getGameSummary(state) {\n    const { config: { id } } = state;\n    const { speed, mistakes } = (0, getGameResults_1.getGameResults)(state);\n    const summaryLines = [\n        `stickies! #${id}`,\n        `completed in ${speed} with ${mistakes}`,\n        `try it at https://example.com`,\n    ];\n    return summaryLines.join(\"\\n\");\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/getGameSummary.ts?");

/***/ }),

/***/ "./src/utils/isGameElements.ts":
/*!*************************************!*\
  !*** ./src/utils/isGameElements.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isGameElements = isGameElements;\nfunction isGameElements(value) {\n    for (const [key, element] of Object.entries(value)) {\n        if (key === 'inputElement' && !(element instanceof HTMLInputElement)) {\n            return false;\n        }\n        if (!(element instanceof HTMLElement)) {\n            return false;\n        }\n    }\n    return true;\n}\n\n\n//# sourceURL=webpack://stickies/./src/utils/isGameElements.ts?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.ts"));
/******/ }
]);