interface IOptions {
	protocol: 'http' | 'https' | string;
	baseUrl: string;
	ext: 'svg' | 'png' | string;
}

export type IEmojiToUnicode = (emoji: string) => string;
export type ICreateUrl = (unicode: string, options: IOptions) => string;

export interface IEmojiRender {
	emoji: string;
	options?: IOptions;
	className?: string;
}
