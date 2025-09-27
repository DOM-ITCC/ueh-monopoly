export const LeaderBoard = ({ leaderboard }) => {
  const LeaderboardItem = ({ avatar, name, student_id, time }) => {
    return (
      <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-md border-[1px] border-[#ddd]">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900 text-sm">{name}</div>
            <div className="text-gray-500 text-xs">MMSV: {student_id}</div>
            <div className="text-gray-500 text-xs">Thời gian: {time}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-[20px] px-[19px] py-[21px] shadow-md w-[280px]">
        <div className="text-[18px] font-bold border-b-[#5A74D2] border-b-[3px] mb-4">
          Bảng xếp hạng
        </div>
        <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
          {leaderboard.map((player, i) => (
            <LeaderboardItem
              key={i}
              avatar={"./user.png"}
              name={player.fullname}
              student_id={player.student_id}
              time={player.time_play}
            />
          ))}
        </div>
      </div>
    </>
  );
}