import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import { parseEnv } from 'node:util';
import handlebars from 'handlebars';

const pages = {"aa9f9ce8-7f57-4244-9ec5-4e2936d97bb0-en":{"outputDir":"./","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/"}]},"1242c3dc-8032-4b7b-9991-b37a44ae0af4-en":{"outputDir":"./consent","lang":"en","title":"Consent - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Consent - Peptide Monitor"},{"name":"description","content":"User consent for pharmacovigilance data collection."},{"name":"keywords","content":"consent, privacy, data"},{"itemprop":"name","content":"Consent - Peptide Monitor"},{"itemprop":"description","content":"User consent for pharmacovigilance data collection."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Consent - Peptide Monitor"},{"name":"twitter:description","content":"User consent for pharmacovigilance data collection."},{"property":"og:title","content":"Consent - Peptide Monitor"},{"property":"og:description","content":"User consent for pharmacovigilance data collection."},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/consent/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/consent/"}]},"f626d47c-fdea-441d-8d6a-8ba797e5deb5-en":{"outputDir":"./signup","lang":"en","title":"Anonymous Signup - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Anonymous Signup - Peptide Monitor"},{"name":"description","content":"Generate your anonymous Peptide Monitor account."},{"name":"keywords","content":"signup, anonymous, account"},{"itemprop":"name","content":"Anonymous Signup - Peptide Monitor"},{"itemprop":"description","content":"Generate your anonymous Peptide Monitor account."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Anonymous Signup - Peptide Monitor"},{"name":"twitter:description","content":"Generate your anonymous Peptide Monitor account."},{"property":"og:title","content":"Anonymous Signup - Peptide Monitor"},{"property":"og:description","content":"Generate your anonymous Peptide Monitor account."},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/signup/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/signup/"}]},"9feb959f-6d4a-43b2-a824-57abf19e27e2-en":{"outputDir":"./dashboard","lang":"en","title":"Dashboard - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Dashboard - Peptide Monitor"},{"name":"description","content":"User health dashboard for Peptide Monitor."},{"name":"keywords","content":"dashboard, peptide, monitor"},{"itemprop":"name","content":"Dashboard - Peptide Monitor"},{"itemprop":"description","content":"User health dashboard for Peptide Monitor."},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Dashboard - Peptide Monitor"},{"name":"twitter:description","content":"User health dashboard for Peptide Monitor."},{"property":"og:title","content":"Dashboard - Peptide Monitor"},{"property":"og:description","content":"User health dashboard for Peptide Monitor."},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/dashboard/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/dashboard/"}]},"29f5cdca-6875-4b29-aadc-f91681152a12-en":{"outputDir":"./insights","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/insights/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/insights/"}]},"16687c2c-fae8-44c4-a35c-d5ff25da6be6-en":{"outputDir":"./side-effects","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/side-effects/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/side-effects/"}]},"df7fcce3-b72e-4cdb-95ef-ef230b285ccf-en":{"outputDir":"./settings","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/settings/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/settings/"}]},"1248c9c2-d050-4d16-b56d-8ca4bc993cfa-en":{"outputDir":"./cycles","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/cycles/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/cycles/"}]},"8e084ccb-6bb1-406f-a1b4-d3a63e9779da-en":{"outputDir":"./biometrics","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/biometrics/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/biometrics/"}]},"5fd2286f-d4d8-4070-a458-e66d5e243272-en":{"outputDir":"./outcomes","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/outcomes/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/outcomes/"}]},"59c5a252-8f10-40bb-84ee-941b6c5c5633-en":{"outputDir":"./log-peptide","lang":"en","title":"Medical Disclaimer - Peptide Monitor","cacheVersion":3,"meta":[{"name":"title","content":"Medical Disclaimer - Peptide Monitor"},{"itemprop":"name","content":"Medical Disclaimer - Peptide Monitor"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:title","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:site_name","content":"Medical Disclaimer - Peptide Monitor"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/log-peptide/"},{"rel":"alternate","hreflang":"en","href":"https://e48af02c-e3db-4099-9d93-b78fc1c17a18.weweb-preview.io/log-peptide/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        structuredData: pageConfig.structuredData || null,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rolldownOptionsInput = {};
for (const pageName in pages) {
    rolldownOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

function getFrontEnvironmentValues(root, mode) {
    const filePath = path.resolve(root, `.env.${mode}`);
    if (!fs.existsSync(filePath)) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(parseEnv(fs.readFileSync(filePath, 'utf8'))).filter(([key]) => !key.startsWith('VITE_'))
    );
}

export default defineConfig(({ mode }) => {
    return {
        plugins: [vue()],
        base: "/",
        define: {
            global: 'globalThis',
            __VUE_PROD_DEVTOOLS__: mode === 'development',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: mode === 'development',
            __WW_FRONT_ENV_VARIABLES__: JSON.stringify({
                staging: getFrontEnvironmentValues(__dirname, 'staging'),
                production: getFrontEnvironmentValues(__dirname, 'production'),
            }),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        server: {
            port: 8080,
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rolldownOptions: {
                input: rolldownOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    if (/Use of direct `eval`/.test(entry.message)) return;
                    return next(entry);
                },
            },
        },
    };
});
