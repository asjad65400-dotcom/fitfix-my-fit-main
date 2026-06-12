import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import {
  Bell,
  CheckCircle2,
  Clock,
  Wallet,
  Filter,
  Package,
  Scissors,
  Search,
  Settings2,
  TrendingUp,
  User,
  X,
  MessageCircle,
  Truck,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import workspaceImg from "@/assets/tailor-workspace.jpg";
import mensImg from "@/assets/mens.jpg";
import womensImg from "@/assets/womens.jpg";
import jeansImg from "@/assets/jeans.jpg";
import expressImg from "@/assets/express.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tailor Dashboard — FixMyFit" },
      { name: "description", content: "Manage orders, customers, earnings and services from one minimal, modern dashboard." },
    ],
  }),
  component: DashboardPage,
});

type Status = "Pending" | "In Progress" | "Completed";

type Order = {
  id: string;
  customer: string;
  garment: string;
  service: string;
  due: string;
  amount: number;
  status: Status;
  image: string;
  phone: string;
  address: string;
};

const fmt = (n: number) => "Rs " + n.toLocaleString("en-PK");

const seedOrders: Order[] = [
  { id: "FMF-2041", customer: "Priya R.", garment: "Navy Blazer", service: "Suit alteration", due: "Tomorrow", amount: 10000, status: "In Progress", image: mensImg, phone: "+92 300 1234567", address: "DHA Phase 5, Karachi" },
  { id: "FMF-2040", customer: "Arjun M.", garment: "Indigo Jeans", service: "Hem & taper", due: "Today", amount: 2800, status: "Pending", image: jeansImg, phone: "+92 321 2345678", address: "Gulshan Block 5, Karachi" },
  { id: "FMF-2039", customer: "Nora K.", garment: "Silk Dress", service: "Dress fitting", due: "Fri", amount: 4500, status: "In Progress", image: womensImg, phone: "+92 333 3456789", address: "Clifton Block 2, Karachi" },
  { id: "FMF-2038", customer: "Zaid A.", garment: "Cotton Shirt", service: "Shirt fitting", due: "Today", amount: 2000, status: "Completed", image: mensImg, phone: "+92 345 4567890", address: "Bahadurabad, Karachi" },
  { id: "FMF-2037", customer: "Mira S.", garment: "Linen Skirt", service: "Length alteration", due: "Mon", amount: 2300, status: "Pending", image: womensImg, phone: "+92 311 5678901", address: "PECHS Block 6, Karachi" },
  { id: "FMF-2036", customer: "Dev P.", garment: "Wool Trousers", service: "Waist alteration", due: "Wed", amount: 3000, status: "Completed", image: jeansImg, phone: "+92 322 6789012", address: "North Nazimabad, Karachi" },
  { id: "FMF-2035", customer: "Fatima Q.", garment: "Bridal Lehnga", service: "Express alteration", due: "Tomorrow", amount: 7500, status: "In Progress", image: expressImg, phone: "+92 301 7890123", address: "DHA Phase 6, Karachi" },
  { id: "FMF-2034", customer: "Ali H.", garment: "Denim Jacket", service: "Zip replacement", due: "Today", amount: 2200, status: "Pending", image: jeansImg, phone: "+92 332 8901234", address: "Gulshan Block 13, Karachi" },
  { id: "FMF-2033", customer: "Hina T.", garment: "Silk Kurta", service: "Sleeve adjustment", due: "Thu", amount: 1600, status: "Completed", image: womensImg, phone: "+92 312 9012345", address: "Bahria Town, Karachi" },
  { id: "FMF-2032", customer: "Rohan B.", garment: "3-piece Suit", service: "Suit alteration", due: "Sat", amount: 13000, status: "In Progress", image: mensImg, phone: "+92 300 0123456", address: "Clifton Block 4, Karachi" },
];

const seedNotifications = [
  { icon: Truck, title: "New pickup scheduled", desc: "Priya R. · 4 garments · Tomorrow 10am", time: "2m", unread: true },
  { icon: CheckCircle2, title: "Order FMF-2038 delivered", desc: "Zaid A. confirmed receipt", time: "1h", unread: true },
  { icon: CreditCard, title: "Payment received", desc: "Rs 10,000 from Priya R.", time: "3h", unread: true },
  { icon: MessageCircle, title: "Message from Mira S.", desc: "Can I add a button replacement?", time: "5h", unread: false },
  { icon: AlertCircle, title: "Order FMF-2034 needs review", desc: "Customer requested taper change", time: "1d", unread: false },
  { icon: Truck, title: "Delivery scheduled", desc: "Hina T. · today 6pm", time: "1d", unread: false },
];

const services = [
  { name: "Shirt fitting", active: true, price: "Rs 2,000" },
  { name: "Pant fitting", active: true, price: "Rs 2,300" },
  { name: "Suit alteration", active: true, price: "Rs 10,000" },
  { name: "Dress fitting", active: true, price: "Rs 3,500" },
  { name: "Zip replacement", active: false, price: "Rs 1,800" },
  { name: "Express 48hr", active: true, price: "Rs 5,800" },
];

const statusStyles: Record<Status, string> = {
  Pending: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  "In Progress": "bg-sky-100 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200",
  Completed: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
};

const weekdays = [
  { short: "Mon", full: "Monday", earnings: 18500, orders: 6 },
  { short: "Tue", full: "Tuesday", earnings: 24200, orders: 8 },
  { short: "Wed", full: "Wednesday", earnings: 19800, orders: 7 },
  { short: "Thu", full: "Thursday", earnings: 31200, orders: 11 },
  { short: "Fri", full: "Friday", earnings: 28400, orders: 10 },
  { short: "Sat", full: "Saturday", earnings: 42600, orders: 14 },
  { short: "Sun", full: "Sunday", earnings: 33500, orders: 12 },
];

type ModalType = null | "all" | "Pending" | "In Progress" | "Completed" | "earnings";

function DashboardPage() {
  const [orders, setOrders] = useState(seedOrders);
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [activeDay, setActiveDay] = useState(5); // Sat default
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "Pending").length;
    const inProgress = orders.filter((o) => o.status === "In Progress").length;
    const completed = orders.filter((o) => o.status === "Completed").length;
    const earnings = orders
      .filter((o) => o.status === "Completed")
      .reduce((s, o) => s + o.amount, 0);
    return { total, pending, inProgress, completed, earnings };
  }, [orders]);

  const filtered = orders.filter(
    (o) =>
      (filter === "All" || o.status === filter) &&
      (o.customer.toLowerCase().includes(query.toLowerCase()) ||
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.garment.toLowerCase().includes(query.toLowerCase())),
  );

  const cycleStatus = (id: string) =>
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status:
                o.status === "Pending"
                  ? "In Progress"
                  : o.status === "In Progress"
                    ? "Completed"
                    : "Pending",
            }
          : o,
      ),
    );

  const unreadCount = notifications.filter((n) => n.unread).length;
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const modalOrders = (() => {
    if (modal === "all") return orders;
    if (modal === "Pending" || modal === "In Progress" || modal === "Completed")
      return orders.filter((o) => o.status === modal);
    return [];
  })();

  const day = weekdays[activeDay];

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-accent">Tailor Dashboard</p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Good morning, Aanya.
              </h1>
              <p className="mt-2 text-muted-foreground">
                You have {stats.pending} pending pickups today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition-colors hover:bg-secondary">
                <Settings2 className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Bell className="h-4 w-4" /> Notifications
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground ring-2 ring-background">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Section className="!py-12">
        {/* Clickable Stats */}
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { label: "Total orders", value: stats.total, icon: Package, accent: "text-accent", action: () => setModal("all") },
            { label: "Pending", value: stats.pending, icon: Clock, accent: "text-amber-600", action: () => setModal("Pending") },
            { label: "Completed", value: stats.completed, icon: CheckCircle2, accent: "text-emerald-600", action: () => setModal("Completed") },
            { label: "Earnings", value: fmt(stats.earnings), icon: Wallet, accent: "text-accent", action: () => setModal("earnings") },
          ].map((s) => (
            <button
              key={s.label}
              onClick={s.action}
              className="group rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
                <s.icon className={`h-5 w-5 ${s.accent}`} strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-display text-4xl font-semibold tabular-nums">{s.value}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" /> +12% this week
                </span>
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View →
                </span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold">Orders</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search orders…"
                      className="w-56 rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
                    {(["All", "Pending", "In Progress", "Completed"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          filter === f
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {filtered.map((o) => (
                  <li
                    key={o.id}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-background p-3 transition-all hover:border-border hover:shadow-sm"
                  >
                    <button onClick={() => setSelectedOrder(o)} className="shrink-0">
                      <img src={o.image} alt="" loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
                    </button>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium">{o.garment}</p>
                        <span className="text-xs text-muted-foreground">· {o.id}</span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {o.customer} · {o.service} · due {o.due}
                      </p>
                    </button>
                    <p className="hidden font-display text-lg font-semibold tabular-nums sm:block">
                      {fmt(o.amount)}
                    </p>
                    <button
                      onClick={() => cycleStatus(o.id)}
                      title="Click to update status"
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105 ${statusStyles[o.status]}`}
                    >
                      {o.status}
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                    <Filter className="mx-auto mb-2 h-5 w-5" /> No orders match your filter.
                  </li>
                )}
              </ul>
            </div>

            {/* Earnings overview - clickable weekdays */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Earnings · {day.full}
                    </p>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                      Click a day
                    </span>
                  </div>
                  <p className="mt-3 font-display text-5xl font-semibold tabular-nums">
                    {fmt(day.earnings)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {day.orders} orders completed
                  </p>
                  <div className="mt-8 flex items-end gap-2 h-32">
                    {weekdays.map((d, i) => {
                      const max = Math.max(...weekdays.map((x) => x.earnings));
                      const h = (d.earnings / max) * 100;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveDay(i)}
                          className="flex-1 group/bar"
                          aria-label={`Show ${d.full} earnings`}
                        >
                          <div
                            className={`rounded-t-md transition-all group-hover/bar:opacity-80 ${
                              i === activeDay
                                ? "bg-gradient-to-t from-accent to-accent/70 shadow-[var(--shadow-soft)]"
                                : "bg-gradient-to-t from-primary/70 to-primary/40"
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    {weekdays.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveDay(i)}
                        className={`flex-1 rounded py-1 transition-colors ${
                          i === activeDay
                            ? "font-semibold text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {d.short}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-xs">
                    <div>
                      <p className="text-muted-foreground">Avg / order</p>
                      <p className="mt-1 font-display text-base font-semibold">
                        {fmt(Math.round(day.earnings / day.orders))}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tips</p>
                      <p className="mt-1 font-display text-base font-semibold">
                        {fmt(Math.round(day.earnings * 0.08))}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pickups</p>
                      <p className="mt-1 font-display text-base font-semibold">{day.orders + 2}</p>
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <img src={workspaceImg} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notifications preview */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Notifications</h3>
                <button
                  onClick={() => setNotifOpen(true)}
                  className="text-xs text-accent hover:underline"
                >
                  View all
                </button>
              </div>
              <ul className="mt-5 space-y-4">
                {notifications.slice(0, 3).map((n) => (
                  <li key={n.title} className="flex gap-3">
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-border"}`} />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-medium">{n.title}</p>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customers */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">Recent customers</h3>
              <ul className="mt-5 space-y-4">
                {[...new Map(orders.map((o) => [o.customer, o])).values()].slice(0, 4).map((o) => (
                  <li key={o.customer} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{o.customer}</p>
                      <p className="text-xs text-muted-foreground">Last: {o.garment}</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="text-xs text-accent hover:underline"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Services</h3>
                <Scissors className="h-4 w-4 text-accent" />
              </div>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.name} className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.price}</p>
                    </div>
                    <ServiceToggle initial={s.active} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* MODAL: Stats drilldown */}
      {modal && (
        <Modal onClose={() => setModal(null)} title={
          modal === "all" ? "All orders" :
          modal === "earnings" ? "Earnings breakdown" :
          `${modal} orders`
        }>
          {modal === "earnings" ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-secondary/40 p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Total earnings</p>
                <p className="mt-2 font-display text-4xl font-semibold tabular-nums">{fmt(stats.earnings)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stats.completed} completed orders</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">By day this week</p>
                <ul className="space-y-2">
                  {weekdays.map((d) => (
                    <li key={d.short} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                      <span className="text-sm font-medium">{d.full}</span>
                      <div className="text-right">
                        <p className="font-display text-base font-semibold tabular-nums">{fmt(d.earnings)}</p>
                        <p className="text-xs text-muted-foreground">{d.orders} orders</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {modalOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center gap-3 rounded-xl border border-border p-3"
                >
                  <img src={o.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {o.garment} · <span className="text-muted-foreground">{o.id}</span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.customer} · {o.service} · due {o.due}
                    </p>
                  </div>
                  <p className="font-display text-sm font-semibold tabular-nums">{fmt(o.amount)}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[o.status]}`}>
                    {o.status}
                  </span>
                </li>
              ))}
              {modalOrders.length === 0 && (
                <li className="py-10 text-center text-sm text-muted-foreground">No orders.</li>
              )}
            </ul>
          )}
        </Modal>
      )}

      {/* NOTIFICATIONS PANEL */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setNotifOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-card shadow-2xl animate-slide-in-right"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-5">
              <div>
                <h3 className="font-display text-2xl font-semibold">Notifications</h3>
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllRead}
                  className="rounded-full px-3 py-1.5 text-xs text-accent hover:underline"
                >
                  Mark all read
                </button>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="rounded-full p-2 hover:bg-secondary"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {notifications.map((n, i) => (
                <li
                  key={i}
                  className={`flex gap-3 px-6 py-4 transition-colors hover:bg-secondary/40 ${
                    n.unread ? "bg-accent/5" : ""
                  }`}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <n.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  {n.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      {/* ORDER DETAIL MODAL */}
      {selectedOrder && (
        <Modal onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder.id}`}>
          <div className="overflow-hidden rounded-2xl">
            <img src={selectedOrder.image} alt="" className="h-48 w-full object-cover" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <Detail label="Customer" value={selectedOrder.customer} />
            <Detail label="Phone" value={selectedOrder.phone} />
            <Detail label="Garment" value={selectedOrder.garment} />
            <Detail label="Service" value={selectedOrder.service} />
            <Detail label="Due" value={selectedOrder.due} />
            <Detail label="Amount" value={fmt(selectedOrder.amount)} />
            <div className="col-span-2">
              <Detail label="Address" value={selectedOrder.address} />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            <button
              onClick={() => {
                cycleStatus(selectedOrder.id);
                setSelectedOrder({
                  ...selectedOrder,
                  status:
                    selectedOrder.status === "Pending"
                      ? "In Progress"
                      : selectedOrder.status === "In Progress"
                        ? "Completed"
                        : "Pending",
                });
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[selectedOrder.status]}`}
            >
              {selectedOrder.status} · click to advance
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-card shadow-2xl animate-scale-in"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-5">
          <h3 className="font-display text-2xl font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ServiceToggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
