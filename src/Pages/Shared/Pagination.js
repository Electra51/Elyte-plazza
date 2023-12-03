export default function Pagination({ length, page, setPage }) {
    const total_pages = Math.ceil(parseInt(length) / 6);

    return (
        <div className="flex flex-wrap justify-end items-center gap-2">
            <button
                className="hover:text-primary p-2 inline-flex items-center gap-2"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
            >
                <span className="text-[#0047af]">«</span>
                <span className="text-[#0047af] text-[14px]">Previous</span>
            </button>

            {[...Array(total_pages)].map((a, idx) => (
                <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`w-7 h-7 text-[12px] rounded-none ${page === idx
                        ? "bg-[#0047af] text-background text-white"
                        : "border border-[#0047af] text-[#0047af]"
                        }`}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                className="hover:text-[#0047af] p-2 inline-flex items-center gap-2"
                onClick={() => setPage(page + 1)}
                disabled={page === total_pages - 1}
            >
                <span className="text-[#0047af] text-[14px]">Next</span>
                <span className="text-[#0047af]">»</span>
            </button>
        </div>
    );
}