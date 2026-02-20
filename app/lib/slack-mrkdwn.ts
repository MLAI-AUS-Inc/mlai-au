const EMOJI_MAP: Record<string, string> = {
    wave: "\u{1F44B}",
    thumbsup: "\u{1F44D}",
    "+1": "\u{1F44D}",
    thumbsdown: "\u{1F44E}",
    "-1": "\u{1F44E}",
    heart: "\u2764\uFE0F",
    fire: "\u{1F525}",
    rocket: "\u{1F680}",
    eyes: "\u{1F440}",
    tada: "\u{1F389}",
    clap: "\u{1F44F}",
    muscle: "\u{1F4AA}",
    pray: "\u{1F64F}",
    raised_hands: "\u{1F64C}",
    sparkles: "\u2728",
    star: "\u2B50",
    white_check_mark: "\u2705",
    x: "\u274C",
    warning: "\u26A0\uFE0F",
    bulb: "\u{1F4A1}",
    memo: "\u{1F4DD}",
    speech_balloon: "\u{1F4AC}",
    thinking_face: "\u{1F914}",
    100: "\u{1F4AF}",
    party_popper: "\u{1F389}",
    rotating_light: "\u{1F6A8}",
    brain: "\u{1F9E0}",
    stethoscope: "\u{1FA7A}",
    hospital: "\u{1F3E5}",
    robot_face: "\u{1F916}",
    chart_with_upwards_trend: "\u{1F4C8}",
    checkered_flag: "\u{1F3C1}",
    trophy: "\u{1F3C6}",
    medal: "\u{1F3C5}",
    handshake: "\u{1F91D}",
    point_right: "\u{1F449}",
    point_left: "\u{1F448}",
    point_up: "\u261D\uFE0F",
    point_down: "\u{1F447}",
    ok_hand: "\u{1F44C}",
    v: "\u270C\uFE0F",
    smile: "\u{1F604}",
    grinning: "\u{1F600}",
    laughing: "\u{1F606}",
    sweat_smile: "\u{1F605}",
    joy: "\u{1F602}",
    wink: "\u{1F609}",
    blush: "\u{1F60A}",
    sunglasses: "\u{1F60E}",
    sob: "\u{1F62D}",
    disappointed: "\u{1F61E}",
    confused: "\u{1F615}",
    angry: "\u{1F620}",
    scream: "\u{1F631}",
    skull: "\u{1F480}",
    poop: "\u{1F4A9}",
    ghost: "\u{1F47B}",
    alien: "\u{1F47D}",
    pill: "\u{1F48A}",
    syringe: "\u{1F489}",
    dna: "\u{1F9EC}",
    microscope: "\u{1F52C}",
    test_tube: "\u{1F9EA}",
    computer: "\u{1F4BB}",
    gear: "\u2699\uFE0F",
    link: "\u{1F517}",
    lock: "\u{1F512}",
    key: "\u{1F511}",
    mag: "\u{1F50D}",
    bell: "\u{1F514}",
    loudspeaker: "\u{1F4E2}",
    email: "\u{1F4E7}",
    calendar: "\u{1F4C5}",
    clock: "\u{1F570}\uFE0F",
    hourglass: "\u231B",
    zap: "\u26A1",
    boom: "\u{1F4A5}",
    collision: "\u{1F4A5}",
    sweat_drops: "\u{1F4A6}",
    droplet: "\u{1F4A7}",
    dash: "\u{1F4A8}",
    earth_americas: "\u{1F30E}",
    sunny: "\u2600\uFE0F",
    cloud: "\u2601\uFE0F",
    umbrella: "\u2614",
    snowflake: "\u2744\uFE0F",
    christmas_tree: "\u{1F384}",
    gift: "\u{1F381}",
    balloon: "\u{1F388}",
    confetti_ball: "\u{1F38A}",
    ribbon: "\u{1F380}",
    crown: "\u{1F451}",
    gem: "\u{1F48E}",
    moneybag: "\u{1F4B0}",
    dollar: "\u{1F4B5}",
    chart: "\u{1F4CA}",
    bar_chart: "\u{1F4CA}",
    clipboard: "\u{1F4CB}",
    pushpin: "\u{1F4CC}",
    paperclip: "\u{1F4CE}",
    scissors: "\u2702\uFE0F",
    hammer: "\u{1F528}",
    wrench: "\u{1F527}",
    shield: "\u{1F6E1}\uFE0F",
    flag: "\u{1F3F4}",
    triangular_flag_on_post: "\u{1F6A9}",
    crossed_fingers: "\u{1F91E}",
    blue_heart: "\u{1F499}",
    purple_heart: "\u{1F49C}",
    green_heart: "\u{1F49A}",
    yellow_heart: "\u{1F49B}",
    orange_heart: "\u{1F9E1}",
    broken_heart: "\u{1F494}",
    heartbeat: "\u{1F493}",
    two_hearts: "\u{1F495}",
    sparkling_heart: "\u{1F496}",
    heartpulse: "\u{1F497}",
    cupid: "\u{1F498}",
    heavy_check_mark: "\u2714\uFE0F",
    heavy_plus_sign: "\u2795",
    heavy_minus_sign: "\u2796",
    heavy_multiplication_x: "\u2716\uFE0F",
    heavy_division_sign: "\u2797",
    exclamation: "\u2757",
    question: "\u2753",
    hash: "#\uFE0F\u20E3",
    asterisk: "*\uFE0F\u20E3",
    arrow_right: "\u27A1\uFE0F",
    arrow_left: "\u2B05\uFE0F",
    arrow_up: "\u2B06\uFE0F",
    arrow_down: "\u2B07\uFE0F",
};

/**
 * Convert Slack mrkdwn to standard markdown compatible with react-markdown.
 */
export function parseSlackMrkdwn(
    text: string,
    users?: Map<string, string>,
): string {
    let result = text;

    // Slack bold *text* → markdown **text**
    // Avoid matching inside code blocks/spans — simple approach: skip if preceded/followed by backtick
    result = result.replace(/(?<![`\\])\*([^*\n]+)\*(?!`)/g, "**$1**");

    // Slack strikethrough ~text~ → markdown ~~text~~
    result = result.replace(/(?<![`\\])~([^~\n]+)~(?!`)/g, "~~$1~~");

    // Slack links: <https://url|text> → [text](url)
    result = result.replace(/<(https?:\/\/[^|>]+)\|([^>]+)>/g, "[$2]($1)");

    // Slack links without label: <https://url> → [url](url)
    result = result.replace(/<(https?:\/\/[^>]+)>/g, "[$1]($1)");

    // User mentions: <@U01ABC123> → @real_name
    result = result.replace(/<@([A-Z0-9]+)>/g, (_match, userId: string) => {
        const name = users?.get(userId);
        return name ? `@${name}` : `@${userId}`;
    });

    // Channel mentions: <#C01XYZ|channel-name> → #channel-name
    result = result.replace(/<#[A-Z0-9]+\|([^>]+)>/g, "#$1");

    // Emoji shortcodes: :emoji: → unicode or leave as-is
    result = result.replace(/:([a-z0-9_+-]+):/g, (_match, code: string) => {
        return EMOJI_MAP[code] ?? `:${code}:`;
    });

    return result;
}
