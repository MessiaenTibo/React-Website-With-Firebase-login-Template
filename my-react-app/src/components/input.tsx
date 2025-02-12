import { useEffect, useState } from 'react';

export default ({
    lable,
    id,
    placeholder,
    width = 'w-full',
    value,
    height = '',
    error,
    errorMessage,
    type = 'text',
    maxLength,
}: {
    lable: string;
    id: string;
    placeholder: string;
    width?: string;
    value?: string;
    height?: string;
    error?: boolean;
    errorMessage?: string;
    type?: string;
    maxLength?: number;
}) => {
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        if (value) setInput(value);
    }, [value]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    return (
        <div className={`${width} text-left`}>
            <div className="mb-2 ">
                <label htmlFor={id} className="text-sm">
                    {lable}
                </label>
            </div>

            <div className="flex items-center">
                <input
                    className={` border-[1px] md:text-lg placeholder:text-grays pr-14 -mr-12 border-grays bg-transparent h-fit px-5 rounded-lg text-sm focus:outline-none w-full ${height} resize-none pb-4 pt-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${error ? 'border-red-500' : 'border-grays'
                        }`}
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={input}
                    maxLength={maxLength}
                    onChange={onChange}
                />
                {maxLength && (
                    <div className="text-xs text-grays">
                        {input.length.toString()}/{maxLength?.toString()}
                    </div>
                )}
            </div>
            {error ? <p className="text-red-500">{errorMessage}</p> : null}
        </div>
    );
};
