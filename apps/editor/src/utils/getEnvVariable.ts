type TVariable = 'BASE_URL' | 'PREVIEW_URL';
type IGetEnvVariables = (varName: TVariable) => string | undefined;

export const getEnvVariable: IGetEnvVariables = envName => {
	return process.env[`REACT_APP_${envName}`];
};
