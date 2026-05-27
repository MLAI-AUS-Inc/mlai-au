export const wattImages = {
  logoDesktop:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2F8.png?alt=media&token=7ac0834c-73a9-48be-94d1-97d529c9dac3",
  logoMobile:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2F11.png?alt=media&token=f2c2d8b0-53f3-4929-94de-6874c9f25547",
  mlaiLogo:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI_Logo_NoText%20(1).png?alt=media&token=072e5f99-b2c8-42c1-a34a-364651aa711c",
  hero:
    "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2021%2C%202026%2C%2010_48_11%20PM%20(1).png?alt=media&token=5e39b6e6-7b02-471c-866f-5d18aae506fe",
} as const;

export const wattPalette = {
  background: "#f7f2e8",
  foreground: "#20231d",
  paper: "#fffdf7",
  paperSoft: "#fbf7ea",
  green: "#3d7339",
  greenDark: "#1f5b2c",
  greenSoft: "#dfead1",
  lime: "#b8d86b",
  gold: "#f2c34c",
  red: "#df5047",
  muted: "#6f756c",
  line: "#e7dfcf",
} as const;

export const wattBackgroundStyle = {
  background:
    "radial-gradient(circle at 14% 8%, rgba(255, 255, 255, 0.95), transparent 24rem), linear-gradient(180deg, #f8f3e9 0%, #fffdf7 40%, #f7f2e8 100%)",
} as const;

export const wattClasses = {
  appShell: "min-h-screen text-[#20231d]",
  page: "px-4 py-8 sm:px-6 lg:px-8",
  panel:
    "rounded-[1.25rem] border border-[rgba(91,82,56,0.14)] bg-[rgba(255,253,247,0.94)] shadow-[0_18px_48px_rgba(67,54,33,0.07),0_2px_8px_rgba(67,54,33,0.04)]",
  panelSoft:
    "rounded-[1.25rem] border border-[#e7dfcf] bg-[#fbf7ea] shadow-[0_16px_38px_rgba(67,54,33,0.06)]",
  panelStrong:
    "rounded-[1.5rem] border border-[rgba(91,82,56,0.14)] bg-[#fffdf7] shadow-[0_22px_60px_rgba(67,54,33,0.09),0_2px_8px_rgba(67,54,33,0.05)]",
  divider: "border-[#e7dfcf]",
  eyebrow: "text-xs font-black uppercase tracking-[0.22em] text-[#52763a]",
  title: "font-black tracking-tight text-[#20231d]",
  muted: "text-[#6f756c]",
  label: "text-sm font-bold text-[#394033]",
  input:
    "mt-1 block w-full rounded-[0.85rem] border border-[#e7dfcf] bg-[#fffdf7] px-3 py-2 text-[#20231d] shadow-sm outline-none transition placeholder:text-[#8a8477] focus:border-[#3d7339] focus:ring-2 focus:ring-[#3d7339]/20",
  inputBare:
    "block w-full rounded-[0.85rem] border border-[#e7dfcf] bg-[#fffdf7] px-3 py-2 text-[#20231d] shadow-sm outline-none transition placeholder:text-[#8a8477] focus:border-[#3d7339] focus:ring-2 focus:ring-[#3d7339]/20",
  fileInput:
    "mt-1 block w-full rounded-[0.85rem] border border-[#e7dfcf] bg-[#fffdf7] px-3 py-2 text-sm text-[#394033] file:mr-3 file:rounded-full file:border-0 file:bg-[#dfead1] file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-[#1f5b2c]",
  buttonPrimary:
    "inline-flex items-center justify-center rounded-full bg-[#3f783c] px-4 py-2 text-sm font-black text-white shadow-[0_10px_22px_rgba(31,91,44,0.2)] transition hover:bg-[#316b35] focus:outline-none focus:ring-2 focus:ring-[#3d7339]/30",
  buttonYellow:
    "inline-flex items-center justify-center rounded-full bg-[#f5d84f] px-4 py-2 text-sm font-black text-[#1e321d] shadow-[0_10px_22px_rgba(118,91,12,0.16)] transition hover:bg-[#f2c34c] focus:outline-none focus:ring-2 focus:ring-[#f2c34c]/40",
  buttonOutline:
    "inline-flex items-center justify-center rounded-full border border-[#d8cfbd] bg-[rgba(255,253,247,0.9)] px-4 py-2 text-sm font-black text-[#20231d] transition hover:border-[#3d7339]/35 hover:bg-[#fbf7ea] focus:outline-none focus:ring-2 focus:ring-[#3d7339]/20",
  iconTile:
    "flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c9dbb8] bg-[#dfead1] text-[#1f5b2c]",
  chip:
    "inline-flex items-center rounded-full border border-[#c9dbb8] bg-[#dfead1] px-3 py-1 text-sm font-bold text-[#1f5b2c]",
  smallChip:
    "inline-flex items-center rounded-full border border-[#e7dfcf] bg-[#fffdf7] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#52763a]",
  successAlert: "rounded-[0.9rem] border border-[#3d7339]/20 bg-[#edf5df] p-3 text-sm font-medium text-[#1f5b2c]",
  errorAlert: "rounded-[0.9rem] border border-[#df5047]/25 bg-[#fff1ef] p-3 text-sm font-medium text-[#9f2f28]",
  warningAlert: "rounded-[0.9rem] border border-[#f2c34c]/50 bg-[#fff8dc] p-4 text-sm font-medium text-[#6f4b08]",
} as const;
