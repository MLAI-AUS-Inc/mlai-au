export const wattImages = {
  logoDesktop:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2F8.png?alt=media&token=7ac0834c-73a9-48be-94d1-97d529c9dac3",
  logoMobile:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2F11.png?alt=media&token=f2c2d8b0-53f3-4929-94de-6874c9f25547",
  mlaiLogo:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI_Logo_NoText%20(1).png?alt=media&token=072e5f99-b2c8-42c1-a34a-364651aa711c",
  hero:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FScreenshot%202026-05-28%20at%2012.52.04%20AM.jpg?alt=media&token=f0271bf7-f455-4321-b780-0520f17c5b49",
  sidebarScene:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2028%2C%202026%2C%2012_43_15%20AM%20(1).png?alt=media&token=6b695dbd-b2bc-4d5d-9369-dc9c9b1d783b",
  bottomScene:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2F2e55e310-c6f3-44c1-baf7-2f97c86bdbc3%20(1).png?alt=media&token=a23d7abb-2e77-48e1-9714-99d3fa87fa52",
  // Scenic energy-neighbourhood backdrop (shared with the Watt The Hack marketing site).
  submitBackdrop:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2021%2C%202026%2C%2010_33_57%20PM%20(1).png?alt=media&token=d14521c8-c549-434c-bb27-643ab95189ad",
} as const;

export const wattPalette = {
  background: "#f8f2e6",
  foreground: "#121e16",
  paper: "#fffefa",
  paperSoft: "#fbf6e9",
  green: "#2f6f2c",
  greenDark: "#155420",
  greenSoft: "#e6efd7",
  lime: "#a8c75b",
  gold: "#f0c742",
  red: "#df5047",
  muted: "#64705f",
  line: "#e8dfcf",
} as const;

export const wattBackgroundStyle = {
  background:
    "linear-gradient(180deg, #fbf6e9 0%, #fffefa 48%, #f8f2e6 100%)",
} as const;

export const wattClasses = {
  appShell: "min-h-screen text-[#121e16]",
  page: "px-4 py-6 sm:px-6 lg:px-8 xl:px-10",
  panel:
    "rounded-[1.25rem] border border-[#e8dfcf] bg-[rgba(255,254,250,0.96)] shadow-[0_14px_36px_rgba(82,67,39,0.07),0_1px_4px_rgba(82,67,39,0.04)]",
  panelSoft:
    "rounded-[1.25rem] border border-[#e8dfcf] bg-[#fbf6e9] shadow-[0_12px_30px_rgba(82,67,39,0.06)]",
  panelStrong:
    "rounded-[1.5rem] border border-[#e8dfcf] bg-[rgba(255,254,250,0.98)] shadow-[0_18px_48px_rgba(82,67,39,0.09),0_1px_5px_rgba(82,67,39,0.05)]",
  divider: "border-[#e8dfcf]",
  eyebrow: "text-xs font-black uppercase tracking-[0.28em] text-[#2f6f2c]",
  title: "font-black tracking-tight text-[#121e16]",
  muted: "text-[#64705f]",
  label: "text-sm font-bold text-[#354031]",
  input:
    "mt-1 block w-full rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-[#121e16] shadow-sm outline-none transition placeholder:text-[#8a8477] focus:border-[#2f6f2c] focus:ring-2 focus:ring-[#2f6f2c]/20",
  inputBare:
    "block w-full rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-[#121e16] shadow-sm outline-none transition placeholder:text-[#8a8477] focus:border-[#2f6f2c] focus:ring-2 focus:ring-[#2f6f2c]/20",
  fileInput:
    "mt-1 block w-full rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-sm text-[#354031] file:mr-3 file:rounded-full file:border-0 file:bg-[#e6efd7] file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-[#155420]",
  buttonPrimary:
    "inline-flex items-center justify-center rounded-[0.65rem] bg-[#2f6f2c] px-4 py-2 text-sm font-black text-white shadow-[0_10px_20px_rgba(21,84,32,0.22)] transition hover:bg-[#155420] focus:outline-none focus:ring-2 focus:ring-[#2f6f2c]/30",
  buttonYellow:
    "inline-flex items-center justify-center rounded-[0.65rem] bg-[#2f6f2c] px-4 py-2 text-sm font-black text-white shadow-[0_10px_20px_rgba(21,84,32,0.22)] transition hover:bg-[#155420] focus:outline-none focus:ring-2 focus:ring-[#2f6f2c]/30",
  buttonOutline:
    "inline-flex items-center justify-center rounded-[0.65rem] border border-[#d8cfbd] bg-[rgba(255,254,250,0.94)] px-4 py-2 text-sm font-black text-[#121e16] shadow-[0_8px_16px_rgba(82,67,39,0.06)] transition hover:border-[#2f6f2c]/35 hover:bg-[#fbf6e9] focus:outline-none focus:ring-2 focus:ring-[#2f6f2c]/20",
  iconTile:
    "flex h-12 w-12 items-center justify-center rounded-full bg-[#e6efd7] text-[#155420]",
  chip:
    "inline-flex items-center rounded-full border border-[#c9dbb8] bg-[#e6efd7] px-3 py-1 text-sm font-bold text-[#155420]",
  smallChip:
    "inline-flex items-center rounded-full border border-[#e8dfcf] bg-[#fffefa] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#2f6f2c]",
  successAlert: "rounded-[0.9rem] border border-[#2f6f2c]/20 bg-[#edf5df] p-3 text-sm font-medium text-[#155420]",
  errorAlert: "rounded-[0.9rem] border border-[#df5047]/25 bg-[#fff1ef] p-3 text-sm font-medium text-[#9f2f28]",
  warningAlert: "rounded-[0.9rem] border border-[#f0c742]/50 bg-[#fff8dc] p-4 text-sm font-medium text-[#6f4b08]",
} as const;
