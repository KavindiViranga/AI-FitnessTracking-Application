import { Context } from "vm"
import { analyzeImage } from "../services/gemini";


export default {
    async analyze(ctx: Context){
        const file = ctx.request.files.image as any;
        if(!file) return ctx.badRequest('No mage uploaded')

            const filePath = file.filepath;

            try{              
                const result = await analyzeImage(filePath)
                return ctx.send({success: true, result})
                } catch (error) {
                    ctx.internalServerError("Analysis failed",
                        {error: error.message}
                    )
                }
    }
}