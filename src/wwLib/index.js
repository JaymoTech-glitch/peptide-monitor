import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
;
/* wwFront:end */

import { computed, reactive } from 'vue';
import { useBackTableViewsStore } from '@/pinia/backTableViews.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useEnvVariablesStore } from '@/pinia/envVariables.js';

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    async initFront({ router, store }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        ;
        /* wwFront:end */

 
        services.scrollStore.start();
        services.keyboardEventStore.start();
        services.pwaStore.start();
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        auth: computed(() => {
            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            return {
                user: backAuthStore.user,
                session: backAuthStore.session,
                isAuthenticated: backAuthStore.isAuthenticated,
            };
        }),
        env: computed(() => {
            const envVariablesStore = useEnvVariablesStore(wwLib.$pinia);
            let env = wwLib.getEnvironment();
            if (env === 'preview') env = 'production';
            return Object.values(envVariablesStore.values).reduce((acc, envVariable) => {
                acc[envVariable.name] = envVariable[`${env}Value`];
                return acc;
            }, {});
        }),
        tableViews: computed(() => {
            const backTableViewsStore = useBackTableViewsStore(wwLib.$pinia);
            return backTableViewsStore?.data;
        }),
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"44811d13-5899-4428-9efe-7bce5206aac0":"#2E90FA","3621977f-9b19-4b32-8489-b54ea0e8bf28":"#0B2A45","fe9d4184-a5ad-40b0-b1fa-96f94762ca53":"#94A3B8","99f00577-4b6f-4d17-8d11-97278e987670":"#0F172A","b3318efe-0f99-4a8b-ae56-0dedd242bb22":"#1E293B","5892a8cb-3033-4b52-847d-7290c363f58d":"#F8FAFC","a9db40bb-abac-45ae-90a9-e06bf0785341":"#94A3B8","cec3b105-f3a6-40dc-8d3c-a1762b2bd27d":"#334155","76da814a-2081-4bd4-b197-e4aca1b9cf07":"#F04438","80078d54-bd68-40dc-adbd-06e3c105ec1d":"#451616","5df00b05-6012-4a12-83cd-79e038b37829":"#F79009","444853d9-f181-4f76-ba38-45c140d10866":"#4C2E05","029bc5e3-8196-450c-8135-8c97ff8a85f1":"#17B26A","5bbfbf8f-20d0-4d04-9348-120bcf374294":"#052E16","4943d3b7-4ef9-4478-acad-84da4b835d79":"#2DD4BF","e84ba4c9-1f9a-4840-bb01-b7151c93bcb0":"#134E4A"} : {"44811d13-5899-4428-9efe-7bce5206aac0":"#005EB8","3621977f-9b19-4b32-8489-b54ea0e8bf28":"#EBF5FF","fe9d4184-a5ad-40b0-b1fa-96f94762ca53":"#475467","99f00577-4b6f-4d17-8d11-97278e987670":"#F9FAFB","b3318efe-0f99-4a8b-ae56-0dedd242bb22":"#FFFFFF","5892a8cb-3033-4b52-847d-7290c363f58d":"#101828","a9db40bb-abac-45ae-90a9-e06bf0785341":"#667085","cec3b105-f3a6-40dc-8d3c-a1762b2bd27d":"#D0D5DD","76da814a-2081-4bd4-b197-e4aca1b9cf07":"#D92D20","80078d54-bd68-40dc-adbd-06e3c105ec1d":"#FEF3F2","5df00b05-6012-4a12-83cd-79e038b37829":"#DC6803","444853d9-f181-4f76-ba38-45c140d10866":"#FFFAEB","029bc5e3-8196-450c-8135-8c97ff8a85f1":"#079455","5bbfbf8f-20d0-4d04-9348-120bcf374294":"#ECFDF3","4943d3b7-4ef9-4478-acad-84da4b835d79":"#0D9488","e84ba4c9-1f9a-4840-bb01-b7151c93bcb0":"#F0FDFA"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"05b35a27-6666-4edd-9b53-983a1f4bdb54":"8px","84b06ec2-c9fd-439f-9fba-1a7eba330154":"32px","62cdf055-d4ef-45aa-87ef-8f9154321c70":"16px","5b92eb6c-3b2d-4304-8dbb-730fb7878925":"8px","d8a855dd-7444-4be6-8e58-23acf64936e4":"4px","cca17dd7-40a3-4719-bb93-160eaf9b9eeb":"64px","74775738-bcb9-4e7c-bce5-687a7fbb5774":"12px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"59d6634f-aaab-4768-8fdc-5aab2c5d6df3":"700 36px/44px 'Inter', sans-serif","d798b6db-e315-4ab2-af7c-fd083fca1dca":"600 30px/38px 'Inter', sans-serif","8262e1ba-4abc-453e-9011-3420ded76bb3":"600 24px/32px 'Inter', sans-serif","57e82ff4-cdc0-4fe7-874e-cee96f7db41f":"400 16px/24px 'Inter', sans-serif","3abb3aa2-88f5-4b82-8889-443cd1278edd":"400 14px/20px 'Inter', sans-serif","56514bc3-64c5-45fd-80d4-3eefd20aa2ca":"600 14px/20px 'Inter', sans-serif"},
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        pwa: services.pwaStore.pwa,
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return getRuntimeEnvironment();
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        if (document.querySelector('.ww-manager-iframe')) {
            return document.querySelector('.ww-manager-iframe').contentWindow;
        }
        return window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwutils.getTextStyleFromContent
     */
    getTextStyleFromContent(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.getTextStyleFromContent is DEPRECATED, use wwLib.wwUtils.getTextStyleFromContent instead'
        // );
        return wwLib.wwUtils.getTextStyleFromContent(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
