export default function Footer() {
    return <div className="mt-auto bottom-0 text-white text-xs bg-gradient-to-t from-[#222328] to-[#313239] w-full h-[2.4em] px-6 py-2 flex justify-between items-center">
        <span className="text-sm"> © SpeakUp, LLC. 2025 </span>
        <div className="settings flex gap-2">
            <button className="hover:underline"> Privacy Statement </button>
            <span>|</span>
            <button className="hover:underline"> Terms of Use </button>
            <span>|</span>
            <button className="hover:underline"> Accessibility Statement </button>
            <span>|</span>
            <button className="hover:underline"> Worldwide Social Network </button>
        </div>
    </div>
}