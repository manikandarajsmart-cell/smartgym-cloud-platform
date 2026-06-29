type Stats = {
  totalMembers: number;
  thisMonthRevenue: number;
  totalRevenue: number;
  totalPayments: number;
  topPayingMember: string;
  activeTrainers: number;
  attendanceCount: number;
  activeMembers: number;
  paidMembers: number;
  pendingMembers: number;
  expiringSoon: number;
  expiredMembers: number;
};

export default function DashboardStats({
  stats,
}: {
  stats: Stats;
}) {
  return (
    <div>
      Dashboard Stats Component
    </div>
  );
}
