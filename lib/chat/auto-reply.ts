/**
 * Automatic first reply: right after a visitor's first message, before any
 * agent has answered, the conversation gets one professional acknowledgement
 * in the visitor's language. Used by both chat transports (ws-server.ts and
 * http-transport.ts). Sent once per conversation — the fixed clientId makes a
 * second attempt a no-op even under a race.
 */
import { db } from "@/lib/db";
import type { ChatConversation } from "@/lib/generated/prisma/client";
import { saveMessage } from "@/lib/chat/service";

export const AUTO_REPLY_CLIENT_ID = "auto-reply-welcome";

type Copy = { sender: string; body: string; askPhone: string };

/** `{name}` is replaced with the visitor's name. */
const COPY: Record<string, Copy> = {
  en: {
    sender: "🤖 Adon ERP Support",
    body:
      "Hello {name}, thank you for contacting Adon ERP! We have received your message. " +
      "A member of our team will get in touch with you shortly, either by phone or right here in the chat.",
    askPhone: "If you would prefer a call, please share your phone number and a convenient time.",
  },
  bn: {
    sender: "🤖 Adon ERP সাপোর্ট",
    body:
      "ধন্যবাদ {name}, Adon ERP-এর সাথে যোগাযোগ করার জন্য! আমরা আপনার মেসেজটি পেয়েছি। " +
      "আমাদের টিমের একজন প্রতিনিধি খুব শীঘ্রই কল অথবা এই চ্যাটে মেসেজের মাধ্যমে আপনার সাথে যোগাযোগ করবেন।",
    askPhone: "কলে কথা বলতে চাইলে অনুগ্রহ করে আপনার ফোন নম্বর ও সুবিধাজনক সময় জানিয়ে দিন।",
  },
  ar: {
    sender: "🤖 دعم Adon ERP",
    body:
      "مرحبًا {name}، شكرًا لتواصلك مع Adon ERP! لقد استلمنا رسالتك. " +
      "سيتواصل معك أحد أعضاء فريقنا قريبًا عبر الهاتف أو هنا في المحادثة.",
    askPhone: "إذا كنت تفضّل مكالمة هاتفية، يرجى مشاركة رقم هاتفك والوقت المناسب لك.",
  },
  ja: {
    sender: "🤖 Adon ERP サポート",
    body:
      "{name} 様、Adon ERP にお問い合わせいただきありがとうございます。メッセージを受け付けました。" +
      "担当者より間もなく、お電話またはこのチャットにてご連絡いたします。",
    askPhone: "お電話をご希望の場合は、電話番号とご都合のよい時間帯をお知らせください。",
  },
  ne: {
    sender: "🤖 Adon ERP सहयोग",
    body:
      "नमस्ते {name}, Adon ERP मा सम्पर्क गर्नुभएकोमा धन्यवाद! हामीले तपाईंको सन्देश प्राप्त गरेका छौं। " +
      "हाम्रो टोलीका एक सदस्यले चाँडै फोन वा यही च्याटमार्फत तपाईंलाई सम्पर्क गर्नुहुनेछ।",
    askPhone: "फोनमा कुरा गर्न चाहनुहुन्छ भने कृपया आफ्नो फोन नम्बर र सुविधाजनक समय पठाउनुहोस्।",
  },
  tr: {
    sender: "🤖 Adon ERP Destek",
    body:
      "Merhaba {name}, Adon ERP ile iletişime geçtiğiniz için teşekkür ederiz! Mesajınızı aldık. " +
      "Ekibimizden bir temsilci kısa süre içinde telefonla veya bu sohbet üzerinden sizinle iletişime geçecek.",
    askPhone: "Telefonla görüşmeyi tercih ederseniz, lütfen telefon numaranızı ve size uygun bir zamanı paylaşın.",
  },
  vi: {
    sender: "🤖 Hỗ trợ Adon ERP",
    body:
      "Xin chào {name}, cảm ơn bạn đã liên hệ với Adon ERP! Chúng tôi đã nhận được tin nhắn của bạn. " +
      "Một thành viên trong đội ngũ của chúng tôi sẽ sớm liên hệ với bạn qua điện thoại hoặc ngay tại cuộc trò chuyện này.",
    askPhone: "Nếu bạn muốn được gọi điện, vui lòng chia sẻ số điện thoại và thời gian thuận tiện.",
  },
  zh: {
    sender: "🤖 Adon ERP 客服",
    body:
      "{name}，您好！感谢您联系 Adon ERP，我们已收到您的消息。" +
      "我们的团队成员将很快通过电话或在此聊天中与您联系。",
    askPhone: "如您希望电话沟通，请留下您的电话号码和方便接听的时间。",
  },
};

export function autoReplyText(conversation: Pick<ChatConversation, "locale" | "visitorName" | "visitorPhone">) {
  const copy = COPY[conversation.locale] ?? COPY.en;
  const body = copy.body.replaceAll("{name}", conversation.visitorName.trim() || "");
  return { sender: copy.sender, body: conversation.visitorPhone ? body : `${body}\n\n${copy.askPhone}` };
}

/**
 * Store the automatic reply if the conversation has no agent reply yet.
 * Returns the new message, or null when nothing was sent.
 */
export async function sendAutoReplyIfFirst(conversation: ChatConversation, delivered: boolean) {
  const replied = await db.chatMessage.count({
    where: { conversationId: conversation.id, senderType: { not: "VISITOR" } },
  });
  if (replied > 0) return null;

  const { sender, body } = autoReplyText(conversation);
  try {
    const { message, duplicate } = await saveMessage({
      conversationId: conversation.id,
      senderType: "ADMIN",
      senderUserId: null,
      senderName: sender,
      body,
      clientId: AUTO_REPLY_CLIENT_ID,
      delivered,
      updatePreview: false,
    });
    return duplicate ? null : message;
  } catch {
    // Unique (conversationId, clientId) hit by a concurrent first message: already sent.
    return null;
  }
}
