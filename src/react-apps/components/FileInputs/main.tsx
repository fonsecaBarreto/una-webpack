import react from 'react'

export namespace UseFileInput {
    export type Params = {
        options: {multiple: boolean},
        callback: ( files: File[]) => void
    }
    export type Result = {
        Open: (e: any) => void
    }
}

export const UseFileInput = ({options, callback}: UseFileInput.Params): UseFileInput.Result  =>{
    
    const { multiple = false } = options

    const fileInput = document.createElement('input')
    fileInput.type="file"
    fileInput.multiple = multiple

    const Open = (e: Event & { target: HTMLInputElement }) =>{
        e.preventDefault();
        fileInput.click()
        fileInput.onchange = e => {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length) {
                var files: File[] = [];
                for (var i = 0; i < target.files.length; i++) {
                    let file = target.files.item(i)
                    if(file)files.push(file);
                }
                callback(files)
            }
        }  
    }

    return ( { Open } )
}

export default UseFileInput