const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

// We don't have a real DOM, but we can simulate the event and inputs
const mockEvent = {
    preventDefault: () => console.log('preventDefault called'),
    target: {
        elements: [
            { tagName: 'INPUT', value: 'Test Judul', classList: { contains: () => false } },
            { tagName: 'SELECT', value: 'Prof. Budi', classList: { contains: () => false } },
            { tagName: 'SELECT', options: [{text: 'MK1'}, {text: 'MK2'}], selectedIndex: 1, classList: { contains: () => false } },
            { tagName: 'INPUT', value: 'MK123', classList: { contains: () => false } },
            { tagName: 'INPUT', value: 'SB1', classList: { contains: () => false } },
            { tagName: 'INPUT', value: 'C:\\fakepath\\file1.mp4', classList: { contains: () => false } },
            { tagName: 'INPUT', value: 'C:\\fakepath\\file2.mp4', classList: { contains: () => false } },
            { tagName: 'SELECT', value: 'Selesai', classList: { contains: () => false } },
            { tagName: 'BUTTON', type: 'submit', classList: { contains: () => false } }
        ]
    }
};

global.window = {
    appData: {
        'video-pembelajaran': [],
        'daftar-editor': [
            { c1: 'Rizky', c2: 'Senior Editor', c3: 'Tersedia' },
            { c1: 'Budi', c2: 'Junior Editor', c3: 'Sedang Mengerjakan' }
        ]
    },
    tableConfigs: {
        'video-pembelajaran': { heads: [1,2,3,4,5,6,7,8] }
    },
    editingIndex: -1,
    document: {
        getElementById: () => null
    },
    showToast: (msg) => console.log('Toast:', msg),
    innerWidth: 1024
};

global.document = window.document;

function loadPageContent(type) {
    console.log('loadPageContent called with:', type);
}
global.loadPageContent = loadPageContent;

// Extract functions
const funcs = ['autoAssignEditor', 'calculateDeadline', 'handleFormSubmit'];
funcs.forEach(f => {
    const regex = new RegExp(`window\\.${f}\\s*=\\s*function[\\s\\S]*?\\};`, 'm');
    const match = code.match(regex);
    if (match) {
        eval(match[0]);
    } else {
        console.log('Could not find', f);
    }
});

try {
    window.handleFormSubmit(mockEvent, 'video-pembelajaran');
    console.log('SUCCESS! newRow:', window.appData['video-pembelajaran'][0]);
} catch (e) {
    console.error('ERROR:', e);
}
