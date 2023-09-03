export const initialProjectData = {
	'64f399f5eb498b75fd3b2f99': {
		name: 'InitialProject',
		folders: {
			'64f399f5eb498b75fd3b2f92': {
				name: '',
				parentFolder: '',
				childrenFolders: ['64f399f5eb498b75fd3b2f96'],
				files: ['64f399f5eb498b75fd3b2f93', '64f399f5eb498b75fd3b2f94', '64f399f5eb498b75fd3b2f95'],
				expanded: true,
				id: '64f399f5eb498b75fd3b2f92',
			},
			'64f399f5eb498b75fd3b2f96': {
				name: 'src',
				parentFolder: '64f399f5eb498b75fd3b2f92',
				childrenFolders: [],
				files: ['64f399f5eb498b75fd3b2f97', '64f399f5eb498b75fd3b2f98'],
				expanded: false,
				id: '64f399f5eb498b75fd3b2f96',
			},
		},
		files: {
			'64f399f5eb498b75fd3b2f93': {
				name: 'index.js',
				content:
					"import { sum } from './src/sum.js'\nimport { a, b } from './src/vars.js'\n\nconsole.log(sum(a, b))",
				id: '64f399f5eb498b75fd3b2f93',
				parentFolder: '64f399f5eb498b75fd3b2f92',
			},
			'64f399f5eb498b75fd3b2f94': {
				name: 'index.html',
				content: '<h1>Change me!</h1>',
				id: '64f399f5eb498b75fd3b2f94',
				parentFolder: '64f399f5eb498b75fd3b2f92',
			},
			'64f399f5eb498b75fd3b2f95': {
				name: 'index.css',
				content: 'html {\n\tfont-family: sans-serif;\n}\n\nh1 {\n\tcolor: green;\n}',
				id: '64f399f5eb498b75fd3b2f95',
				parentFolder: '64f399f5eb498b75fd3b2f92',
			},
			'64f399f5eb498b75fd3b2f97': {
				name: 'sum.js',
				content: 'export const sum = (a, b) => a + b',
				id: '64f399f5eb498b75fd3b2f97',
				parentFolder: '64f399f5eb498b75fd3b2f96',
			},
			'64f399f5eb498b75fd3b2f98': {
				name: 'vars.js',
				content: 'export const a = 4\nexport const b = 5',
				id: '64f399f5eb498b75fd3b2f98',
				parentFolder: '64f399f5eb498b75fd3b2f96',
			},
		},
		rootFolder: '64f399f5eb498b75fd3b2f92',
		id: '64f399f5eb498b75fd3b2f99',
	},
};
