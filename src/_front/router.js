import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';

/**
 * @typedef {import('vue-router').Router} Router
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue-router').RouterOptions} RouterOptions
 * @typedef {import('vue-router').RouterScrollBehavior} RouterScrollBehavior
 */

/**
 * @typedef {Object} Lang
 * @property {string} lang
 * @property {boolean} [default]
 * @property {boolean} [isDefaultPath]
 */

/**
 * @typedef {Object} PageSecurity
 * @property {'authenticated' | string} [accessRule]
 * @property {string[]} [accessRoles]
 * @property {'AND' | 'OR'} [accessRolesCondition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {Record<string, string> & { default: string }} paths
 * @property {string[]} langs
 * @property {PageSecurity} [security]
 * @property {{ userGroup: string }[]} [pageUserGroups]
 */

/**
 * @typedef {Object} DesignInfo
 * @property {string} homePageId
 * @property {Page[]} pages
 * @property {Lang[]} langs
 * @property {unknown} [auth]
 * @property {{ href?: string }} [baseTag]
 */

/** @type {Router} */
let router;
/** @type {RouteRecordRaw[]} */
const routes = [];

/** @type {RouterScrollBehavior} */
const scrollBehavior = to => {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
};

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

window.wwg_designInfo = {"id":"e48af02c-e3db-4099-9d93-b78fc1c17a18","homePageId":"aa9f9ce8-7f57-4244-9ec5-4e2936d97bb0","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"back":{"isServerSetup":{"staging":true,"production":true}},"auth":{"integration":"supabase","connectionId":"7ace3347-8471-4ee2-9d1d-c77ddb4d2c93","unauthenticatedPageId":"f626d47c-fdea-441d-8d6a-8ba797e5deb5","unauthorizedPageId":"f626d47c-fdea-441d-8d6a-8ba797e5deb5"},"pages":[{"id":"aa9f9ce8-7f57-4244-9ec5-4e2936d97bb0","linkId":"aa9f9ce8-7f57-4244-9ec5-4e2936d97bb0","name":"Disclaimer","folder":null,"paths":{"en":"/","default":"/"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"6fe723fb-7dd3-4adb-9407-1981b0b2fcf6","sectionTitle":"Consent Page","linkId":"ee02cd37-8131-487b-a2ff-f059d3d4a5fc"},{"uid":"f5794d53-8128-421c-87d9-1e0711115f41","sectionTitle":"Disclaimer Page","linkId":"c23cee2b-36e5-42b9-877c-ed486037d269"}],"pageUserGroups":[],"title":{"en":"Medical Disclaimer - Peptide Monitor"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"1242c3dc-8032-4b7b-9991-b37a44ae0af4","linkId":"1242c3dc-8032-4b7b-9991-b37a44ae0af4","name":"Consent","folder":null,"paths":{"en":"/consent","default":"/consent"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"6cb9dd2b-036f-471e-9c1d-5bf036361c24","sectionTitle":"Consent Page Background","linkId":"043e5354-3119-4607-85c0-386d637f8d4a"}],"pageUserGroups":[],"title":{"en":"Consent - Peptide Monitor"},"meta":{"desc":{"en":"User consent for pharmacovigilance data collection."},"keywords":{"en":"consent, privacy, data"},"socialDesc":{"en":"User consent for pharmacovigilance data collection."},"socialTitle":{"en":"Consent - Peptide Monitor"},"structuredData":{}},"metaImage":"","security":{}},{"id":"f626d47c-fdea-441d-8d6a-8ba797e5deb5","linkId":"f626d47c-fdea-441d-8d6a-8ba797e5deb5","name":"Signup","folder":null,"paths":{"en":"/signup","default":"/signup"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"e54b1d98-2967-444f-beb6-5611fcbbd516","sectionTitle":"Signup Page Root","linkId":"ab3d6905-6ded-4554-8d7a-d0411f1d4cf2"}],"pageUserGroups":[],"title":{"en":"Anonymous Signup - Peptide Monitor"},"meta":{"desc":{"en":"Generate your anonymous Peptide Monitor account."},"keywords":{"en":"signup, anonymous, account"},"socialDesc":{"en":"Generate your anonymous Peptide Monitor account."},"socialTitle":{"en":"Anonymous Signup - Peptide Monitor"},"structuredData":{}},"metaImage":"","security":{}},{"id":"9feb959f-6d4a-43b2-a824-57abf19e27e2","linkId":"9feb959f-6d4a-43b2-a824-57abf19e27e2","name":"Dashboard","folder":null,"paths":{"en":"/dashboard","default":"/dashboard"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"921bd722-8fa0-46d1-8b5e-2f6e69a7620a","sectionTitle":"Dashboard Layout","linkId":"ce72d745-1d4f-4372-82b7-0c9c106fe73e"},{"uid":"54134c1d-f3c0-4c88-a0f7-512d697fa7ec","sectionTitle":"Mobile Bottom Navigation","linkId":"c65423fc-0246-4e3b-94cf-f7de7a21cc68"}],"pageUserGroups":[],"title":{"en":"Dashboard - Peptide Monitor"},"meta":{"desc":{"en":"User health dashboard for Peptide Monitor."},"keywords":{"en":"dashboard, peptide, monitor"},"socialDesc":{"en":"User health dashboard for Peptide Monitor."},"socialTitle":{"en":"Dashboard - Peptide Monitor"},"structuredData":{}},"metaImage":"","security":{}},{"id":"29f5cdca-6875-4b29-aadc-f91681152a12","linkId":"29f5cdca-6875-4b29-aadc-f91681152a12","name":"Community Insights","folder":null,"paths":{"en":"/insights","default":"/insights"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"16687c2c-fae8-44c4-a35c-d5ff25da6be6","linkId":"16687c2c-fae8-44c4-a35c-d5ff25da6be6","name":"Side Effects","folder":null,"paths":{"en":"/side-effects","default":"/side-effects"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"df7fcce3-b72e-4cdb-95ef-ef230b285ccf","linkId":"df7fcce3-b72e-4cdb-95ef-ef230b285ccf","name":"Settings","folder":null,"paths":{"en":"/settings","default":"/settings"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"1248c9c2-d050-4d16-b56d-8ca4bc993cfa","linkId":"1248c9c2-d050-4d16-b56d-8ca4bc993cfa","name":"My Cycles","folder":null,"paths":{"en":"/cycles","default":"/cycles"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"8e084ccb-6bb1-406f-a1b4-d3a63e9779da","linkId":"8e084ccb-6bb1-406f-a1b4-d3a63e9779da","name":"Biometrics","folder":null,"paths":{"en":"/biometrics","default":"/biometrics"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"5fd2286f-d4d8-4070-a458-e66d5e243272","linkId":"5fd2286f-d4d8-4070-a458-e66d5e243272","name":"Outcomes","folder":null,"paths":{"en":"/outcomes","default":"/outcomes"},"langs":["en"],"cmsDataSetPath":null,"sections":[],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}},{"id":"59c5a252-8f10-40bb-84ee-941b6c5c5633","linkId":"59c5a252-8f10-40bb-84ee-941b6c5c5633","name":"Log Peptide","folder":null,"paths":{"en":"/log-peptide","default":"/log-peptide"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"acbfe66d-8edd-4ff2-95c0-7ce81a8bb294","sectionTitle":"Log Peptide Layout","linkId":"7e6ec892-876f-42a3-84f6-657052e47f49"},{"uid":"54134c1d-f3c0-4c88-a0f7-512d697fa7ec","sectionTitle":"Mobile Bottom Navigation","linkId":"c65423fc-0246-4e3b-94cf-f7de7a21cc68"}],"pageUserGroups":[],"title":{},"meta":{},"metaImage":"","security":{}}],"plugins":[]};
window.wwg_cacheVersion = 3;
window.wwg_pluginsSettings = pluginsSettings;
window.wwg_disableManifest = true;

/** @type {Lang} */
const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {
    lang: 'en',
    default: true,
};

/**
 * @param {Page} page
 * @param {Lang} lang
 * @param {string} [forcedPath]
 */
const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            if (!wwLib.wwAuth.plugin) {
                if (!backAuthStore.projectAuth && window.wwg_designInfo.auth) {
                    backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
                }
            }

            //Init plugins
            await initializePlugins();

            //Init integration instances
            await initializeIntegrationInstances();

            if (!wwLib.wwAuth.plugin) {
                await backAuthStore.refresh();
                const projectAuth = backAuthStore.projectAuth || {};

                //Check if private page
                if (page.security?.accessRule === 'authenticated') {
                    if (!backAuthStore.isAuthenticated) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            projectAuth.unauthenticatedPageId
                        )}?_source=${to.path}`;
                        return null;
                    } else if (page.security?.accessRoles?.length) {
                        const hasAccess =
                            page.security.accessRolesCondition === 'AND'
                                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                                : backAuthStore.matchAnyRoles(page.security.accessRoles);
                        if (!hasAccess) {
                            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                                projectAuth.unauthorizedPageId
                            )}?_source=${to.path}`;
                            return null;
                        }
                    }
                }
            } else {
                // Deprecated legacy auth plugins, to remove in the future
                if (page.pageUserGroups?.length) {
                    await wwLib.wwAuth.init();

                    // Redirect to not sign in page if not logged
                    if (!wwLib.wwAuth.getIsAuthenticated()) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthenticatedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }

                    //Check roles are required
                    if (
                        page.pageUserGroups.length > 1 &&
                        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                    ) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthorizedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        redirect: null,
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

/** @type {RouterOptions} */
let routerOptions;

const isProd = getRuntimeEnvironment() === 'production';

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
