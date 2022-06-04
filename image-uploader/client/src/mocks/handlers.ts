import {rest} from 'msw';

// mock to handle image upload, accepts image blob
// submitted to image service, service returns status 200
// and image url.
export const handlers =[
    rest.post('/upload',(req,res,ctx)=>{
        const imageUrl = "https://picsum.photos/200/300";
        return res(ctx.status(200),ctx.json({imageUrl}),ctx.delay(2000))
    })
]