import { findAutomation } from "@/action/automation/queries";
import { createChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword } from "@/action/webhooks/query";
import { sendDM, sendPrivateMessage, trackResponses } from "@/lib/fetch";
import { client } from "@/lib/prisma";
import { NextRequest , NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("👋 Webhook GET called");
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    return new NextResponse(hub)
}

export async function POST(req: NextRequest){
    const webhook_payload = await req.json()
    let matcher
    try {
        //messages
        if(webhook_payload.entry[0].messaging) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].messaging[0].message.text
            )
        }

        //comments
        if (webhook_payload.entry[0].changes) {
            console.log(webhook_payload.entry[0].changes[0].value.text)
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            )
        }

        if(matcher && matcher.automationId){
            //we have a keyword matcher

            //checking if its a cmessage or dm 
            // here checking if its a DM
            if(webhook_payload.entry[0].messaging) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )

                if (automation && automation.trigger) {
                    if (
                        automation.listner && 
                        automation.listner.listener === 'MESSAGE'
                    ) {
                        console.log("🧠 Automation ID:", automation.id);
                        console.log("👤 User ID:", automation.User?.integrations);
                        console.log("🔐 Token:", automation.User?.integrations?.[0]?.token);

                        const direct_Message = await sendDM(
                            //our user id
                            webhook_payload.entry[0].id,
                            //why senderID because we are sending message to the sender (according to instagram)
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listner.prompt,
                            automation.User?.integrations[0].token!
                        )
                        
                        if(direct_Message.status === 200){
                            const tracked = await trackResponses(
                                automation.id,
                                'DM'
                            )

                            if(tracked){
                                return NextResponse.json({
                                    status: 200,
                                    message: 'Message sent'
                                })
                            }
                        }
                    }
                }

                if ( 
                    automation?.listner && 
                    automation.listner.listener === 'SMARTAI' 
                    //come here to change Pro to free testing purpose
                    // automation.User?.subscription?.plan !== 'PRO'
                ){
                // ai features here
                //current we are writing it for openai but leter we will add gemini here
                const smart_ai_message = await openai.chat.completions.create({
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'assistant',
                            content: `${automation.listner?.prompt}: keep response under 2 sentences`
                        }
                    ]
                })

                
                if (smart_ai_message.choices[0].message.content){
                    const reciever = createChatHistory(
                        automation.id,
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        webhook_payload.entry[0].messaging[0].message.text,
                    )

                    const sender = createChatHistory(
                        automation.id,
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        smart_ai_message.choices[0].message.content
                    )

                    await client.$transaction([reciever, sender])

                    const direct_Message = await sendDM(
                        //our user id
                        webhook_payload.entry[0].id,
                        //why senderID because we are sending message to the sender (according to instagram)
                        webhook_payload.entry[0].messaging[0].sender.id,
                        smart_ai_message.choices[0].message.content,
                        automation.User?.integrations[0].token!
                    )

                    if(direct_Message.status === 200){
                        const tracked = await trackResponses(
                            automation.id,
                            'DM'
                        )

                        if(tracked){
                            return NextResponse.json({
                                status: 200,
                                message: 'Message sent'
                            })
                        }
                    }
                }

                }

            }


            if (
                webhook_payload.entry[0].changes &&
                webhook_payload.entry[0].changes[0].field === 'comments'  
            ) {
                
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )

                const automation_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )
    
                if (automation && automation_post && automation.trigger) {
                    if ( automation.listner ) {
                        if (automation.listner.listener === 'MESSAGE') {
                            const direct_Message = await sendPrivateMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listner?.prompt,
                                automation.User?.integrations[0].token!
                            )
                            
                            if(direct_Message.status === 200){
                                const tracked = await trackResponses(
                                    automation.id,
                                    'COMMENT'
                                )
    
                                console.log('Direct message sent', direct_Message)
                                if(tracked){
                                    return NextResponse.json({
                                        status: 200,
                                        message: 'Message sent'
                                    })
                                }
                            }    
                        }
                        if (
                            automation.listner.listener === 'SMARTAI' 
                            // automation.User?.subscription?.plan !== 'PRO'
                        ){
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gpt-4o',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listner?.prompt}: keep response under 2 sentences`
                                    }
                                ]
                            })
                            if (smart_ai_message.choices[0].message.content){
                                const reciever = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content
                                )

                                await client.$transaction([reciever, sender])

                                const direct_Message = await sendDM(
                                    //our user id
                                    webhook_payload.entry[0].id,
                                    //why senderID because we are sending message to the sender (according to instagram)
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!
                                )

                                if(direct_Message.status === 200){
                                    const tracked = await trackResponses(
                                        automation.id,
                                        'COMMENT'
                                    )

                                    if(tracked){
                                        return NextResponse.json({
                                            status: 200,
                                            message: 'Message sent'
                                        })
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }

        if (!matcher) {
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].recipient.id,
                webhook_payload.entry[0].messaging[0].sender.id
            )

            if (customer_history.history.listener > 0 ) {
                const automation = await findAutomation( 
                    customer_history.automationId,
                )

                if (
                    // automation?.User?.subscription?.plan !== 'PRO' &&
                    automation?.listner?.listener === 'SMARTAI'
                ) {
                    const smart_ai_message = await openai.chat.completions.create({
                        model: 'gpt-4o', 
                        messages: [
                            {
                                role: 'assistant',
                                content: `${automation.listner?.prompt}: keep response under 2 sentences`
                            },
                            ...customer_history.history,
                            {
                                role: 'user',
                                content: webhook_payload.entry[0].messaging[0].message.text
                            }
                        ]
                    })
                    
                    if (smart_ai_message.choices[0].message.content){
                        const reciever = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content
                        )

                        await client.$transaction([reciever, sender])

                        const direct_Message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!
                        )

                        if(direct_Message.status === 200){
                            console.log('Message sent successfully', direct_Message)
                            return NextResponse.json({
                                status: 200,
                                message: 'Message sent'
                            })  
                        }
                    }
                }
            }

            return NextResponse.json({
                status: 200,
                message: 'No automation found'
            })
        }

        return NextResponse.json({
            status: 200,
            message: 'No automation set'
        })


    } catch (error) {
        console.log('Error in Instagram webhook:', error)
        return NextResponse.json({
            status: 200,
            message: 'Internal server error',
        })
    }
}