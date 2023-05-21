interface Props {
    [key: string]: string;
}
declare function GetArrayProps<T>(objects: T[]): Props;
export { GetArrayProps, Props };
