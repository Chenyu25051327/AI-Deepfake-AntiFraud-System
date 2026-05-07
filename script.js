function analyzeCase() {
  const caseText = document.getElementById("caseInput").value;
  const resultBox = document.getElementById("caseResult");

  if (caseText.trim() === "") {
    resultBox.innerText = "请先描述你遇到的情况。";
    return;
  }

  let score = 0;
  let risks = [];
  let suggestions = [];
  let verifySteps = [];

  if (caseText.includes("转账") || caseText.includes("汇款") || caseText.includes("打钱") || caseText.includes("借钱")) {
    score += 25;
    risks.push("对方涉及转账、汇款或借钱请求，这是诈骗中非常常见的高风险信号。");
    suggestions.push("不要立刻转账，应先暂停操作。");
    verifySteps.push("通过对方平时使用的手机号重新拨打电话确认，不要直接相信当前聊天窗口里的视频或语音。");
    verifySteps.push("如果是熟人借钱，可以通过共同好友、家人或线下方式再次核实。");
  }

  if (caseText.includes("验证码") || caseText.includes("密码") || caseText.includes("银行卡") || caseText.includes("身份证")) {
    score += 25;
    risks.push("对方要求提供验证码、密码、银行卡或身份证等敏感信息，存在个人信息泄露风险。");
    suggestions.push("不要向任何人透露验证码、密码、银行卡号和身份证信息。");
    verifySteps.push("正规机构一般不会通过私人聊天要求你提供验证码或银行卡信息，可以登录官方平台或拨打官方电话确认。");
  }

  if (caseText.includes("二维码") || caseText.includes("链接") || caseText.includes("网址") || caseText.includes("下载")) {
    score += 15;
    risks.push("对方要求扫描二维码、点击链接或下载软件，可能存在钓鱼网站或木马风险。");
    suggestions.push("不要随意点击陌生链接，也不要下载来源不明的软件。");
    verifySteps.push("不要从对方发来的链接进入页面，应自己打开官方网站、官方 App 或学校正式平台进行核实。");
  }

  if (caseText.includes("保证金") || caseText.includes("押金") || caseText.includes("刷单") || caseText.includes("兼职")) {
    score += 20;
    risks.push("涉及保证金、押金、刷单或高薪兼职，可能是兼职诈骗。");
    suggestions.push("正规兼职一般不会要求提前交钱，遇到高薪低门槛兼职要提高警惕。");
    verifySteps.push("可以查询公司真实信息，向辅导员、同学或家人求证，不要先交保证金或押金。");
  }

  if (caseText.includes("视频") || caseText.includes("语音") || caseText.includes("声音") || caseText.includes("脸")) {
    score += 15;
    risks.push("视频、语音或人脸信息可能被 AI 换脸、语音克隆等技术伪造。");
    suggestions.push("即使视频或声音像熟人，也要通过其他渠道确认身份。");
    verifySteps.push("可以要求对方做实时动作，例如转头、挥手、说出当天具体事件，但这只能作为辅助判断，不能代替电话核实。");
    verifySteps.push("可以问一个只有本人知道的问题，例如最近一起经历过的事情，但不要把答案提前透露给对方。");
  }

  if (caseText.includes("马上") || caseText.includes("立刻") || caseText.includes("赶紧") || caseText.includes("紧急")) {
    score += 15;
    risks.push("对方制造紧急感，催促你马上操作，这是诈骗话术中的常见手段。");
    suggestions.push("遇到紧急要求时，更应该暂停操作，冷静核实。");
    verifySteps.push("先等待 5 到 10 分钟冷静判断，再通过其他渠道确认，不要在对方催促下立刻操作。");
  }

  if (caseText.includes("保密") || caseText.includes("不要告诉") || caseText.includes("别告诉") || caseText.includes("不要声张")) {
    score += 20;
    risks.push("对方要求你保密或不要告诉别人，可能是在阻止你向他人求证。");
    suggestions.push("不要独自处理，应及时和辅导员、家人、同学或学校保卫处沟通。");
    verifySteps.push("如果对方要求保密，反而更应该找可信的人一起判断，例如辅导员、家长、室友或学校保卫处。");
  }

  if (caseText.includes("辅导员") || caseText.includes("老师") || caseText.includes("领导") || caseText.includes("家长") || caseText.includes("朋友")) {
    score += 10;
    risks.push("对方冒充熟人、老师或权威身份，可能利用信任关系降低你的防备。");
    suggestions.push("涉及熟人、老师或家长身份时，也要通过官方渠道或原联系方式确认。");
    verifySteps.push("如果对方自称老师或辅导员，应通过钉钉、班级群、学院官网或原手机号确认。");
  }

  let level = "";
  let summary = "";

  if (score >= 70) {
    level = "高风险";
    summary = "你的描述中出现了多个明显诈骗特征，建议立即停止操作，不要转账、不要点击链接、不要透露个人信息。";
  } else if (score >= 40) {
    level = "中风险";
    summary = "你的描述中存在一定风险，需要进一步核实对方身份和信息来源。";
  } else if (score >= 15) {
    level = "低到中风险";
    summary = "你的描述中有少量可疑点，建议保持警惕，不要轻易点击链接或提供个人信息。";
  } else {
    level = "暂未发现明显风险";
    summary = "系统暂未识别到明显诈骗关键词，但这不代表一定安全。涉及钱、账号、身份信息时仍应谨慎。";
  }

  if (risks.length === 0) {
    risks.push("暂未识别到明显诈骗关键词，但仍需结合实际情况判断。");
  }

  if (suggestions.length === 0) {
    suggestions.push("遇到涉及钱、账号、身份信息的问题时，建议先向辅导员、家人或学校保卫处确认。");
  }

  if (verifySteps.length === 0) {
    verifySteps.push("通过官方渠道核实信息来源，不要只相信单一聊天记录、语音或视频。");
    verifySteps.push("涉及转账、验证码、身份证号、银行卡号等内容时，应先暂停操作并向可信的人求证。");
  }

  resultBox.innerHTML =
    `<strong>风险等级：${level}</strong><br><br>` +
    `<strong>综合分析：</strong>${summary}<br><br>` +
    `<strong>可疑细节：</strong><br>` +
    risks.map((item, index) => `${index + 1}. ${item}`).join("<br>") +
    `<br><br><strong>处理建议：</strong><br>` +
    suggestions.map((item, index) => `${index + 1}. ${item}`).join("<br>") +
    `<br><br><strong>进一步核实方法：</strong><br>` +
    verifySteps.map((item, index) => `${index + 1}. ${item}`).join("<br>") +
    `<br><br><strong>提醒：</strong>本系统只能提供风险参考，不能代替警方、学校保卫处或官方平台的判断。遇到疑似诈骗时，应及时寻求老师、家人或警方帮助。`;
}

function showScene() {
  const type = document.getElementById("sceneType").value;
  const resultBox = document.getElementById("sceneResult");

  let content = "";

  if (type === "friend") {
    content =
      "<strong>场景：AI换脸冒充好友借钱</strong><br><br>" +
      "晚上，你突然收到一位朋友的视频通话。视频中对方的脸和声音都很像本人。他说自己手机支付被冻结，急需借 800 元，并一直催你马上转账。<br><br>" +
      "<strong>风险点：</strong><br>" +
      "1. 视频中像熟人也可能是 AI 换脸。<br>" +
      "2. 对方要求转账。<br>" +
      "3. 对方制造紧急感。<br>" +
      "4. 对方不愿意通过其他方式确认。<br><br>" +
      "<strong>正确做法：</strong><br>" +
      "不要立刻转账，应挂断后通过原手机号、共同好友或线下方式确认。";
  }

  if (type === "teacher") {
    content =
      "<strong>场景：AI语音冒充辅导员通知缴费</strong><br><br>" +
      "你接到一个电话，对方声音很像辅导员，说学校正在统一办理信息认证，需要你在 30 分钟内缴纳 299 元认证费，否则会影响学籍。<br><br>" +
      "<strong>风险点：</strong><br>" +
      "1. 以学籍问题制造焦虑。<br>" +
      "2. 要求短时间内缴费。<br>" +
      "3. 没有通过钉钉、学院官网或班级群正式通知。<br><br>" +
      "<strong>正确做法：</strong><br>" +
      "通过钉钉、学院官网、班级群或辅导员原手机号确认，不要直接扫码付款。";
  }

  if (type === "job") {
    content =
      "<strong>场景：AI生成兼职招聘骗局</strong><br><br>" +
      "你在社交平台看到兼职信息：AI数据标注，日结 300 元，无需经验。客服要求你先交 99 元保证金，并下载指定软件认证。<br><br>" +
      "<strong>风险点：</strong><br>" +
      "1. 高薪低门槛。<br>" +
      "2. 要求先交保证金。<br>" +
      "3. 要求下载陌生软件。<br>" +
      "4. 宣传图片和案例可能由 AI 生成。<br><br>" +
      "<strong>正确做法：</strong><br>" +
      "不要交保证金，不下载陌生软件，可以向辅导员、家人或同学求证。";
  }

  if (type === "parent") {
    content =
      "<strong>场景：AI换脸冒充家长紧急转账</strong><br><br>" +
      "你收到“家长”的视频消息，对方说家里临时有事，需要你马上把生活费转到一个亲戚账户。视频里的人脸和声音都很像家长，但一直催你赶紧操作。<br><br>" +
      "<strong>风险点：</strong><br>" +
      "1. 冒充家人身份。<br>" +
      "2. 使用视频增加可信度。<br>" +
      "3. 要求马上转账。<br>" +
      "4. 不愿长时间沟通。<br><br>" +
      "<strong>正确做法：</strong><br>" +
      "通过家长平时使用的手机号重新拨打电话确认，必要时联系其他家人核实。";
  }

  if (type === "email") {
    content =
      "<strong>场景：AI伪造老师邮件收集个人信息</strong><br><br>" +
      "你收到一封邮件，发件人头像和名字都像任课老师。邮件称课程成绩统计需要补充个人信息，要求填写身份证号、手机号、银行卡号并上传学生证照片。<br><br>" +
      "<strong>风险点：</strong><br>" +
      "1. 索要敏感个人信息。<br>" +
      "2. 邮件可能由 AI 生成，看起来很正式。<br>" +
      "3. 链接可能是钓鱼网站。<br><br>" +
      "<strong>正确做法：</strong><br>" +
      "不要点击邮件链接，应通过钉钉、课程群或老师原联系方式确认。";
  }

  resultBox.innerHTML = content;
}

function checkDeepfake() {
  const items = document.querySelectorAll(".deepfakeItem");
  const resultBox = document.getElementById("deepfakeResult");

  let count = 0;

  items.forEach(function(item) {
    if (item.checked) {
      count++;
    }
  });

  let result = "";

  if (count >= 5) {
    result = "你识别出了多个高风险线索，该内容存在较高伪造或诈骗风险。建议立即停止操作，并通过官方渠道或熟人原联系方式确认。";
  } else if (count >= 3) {
    result = "你识别出了一些可疑线索，该内容存在一定风险。建议保持警惕，不要急于转账或透露个人信息。";
  } else if (count >= 1) {
    result = "你识别到少量风险点。虽然风险不一定很高，但涉及金钱、身份信息或隐私时仍需要进一步核实。";
  } else {
    result = "你暂未勾选风险线索。但在现实生活中，AI伪造内容可能不容易识别，仍应保持谨慎。";
  }

  resultBox.innerText = result;
}

function generateAdvice() {
  const type = document.getElementById("adviceType").value;
  const resultBox = document.getElementById("adviceResult");

  let advice = "";

  if (type === "money") {
    advice = "遇到转账或借钱请求时，不要立即操作。应通过对方原手机号、线下见面、共同好友或家人进行确认。尤其是对方催促、保密或只通过视频联系时，更要提高警惕。";
  }

  if (type === "code") {
    advice = "验证码、密码、银行卡号和身份证信息都属于敏感信息。任何人以任何理由索要这些信息，都应保持警惕。正规机构一般不会通过私人聊天索要验证码。";
  }

  if (type === "link") {
    advice = "不要随意点击陌生链接或扫描陌生二维码。可以自己打开官方网站、学校平台或官方 App 进行核实，不要从对方发来的链接进入页面。";
  }

  if (type === "photo") {
    advice = "如果个人照片被 AI 恶搞或换脸，应及时保存证据，不继续传播相关内容，并向平台举报。情节严重时，可以联系学校、家长或公安机关处理。";
  }

  if (type === "job") {
    advice = "正规兼职一般不会要求先交保证金、押金或刷单垫付。遇到高薪低门槛兼职、下载陌生软件、要求实名认证和银行卡信息时，要提高警惕。";
  }

  resultBox.innerText = advice;
}

function showKnowledge(type) {
  const resultBox = document.getElementById("knowledgeResult");
  let text = "";

  if (type === "deepfake") {
    text = "深度伪造是指利用人工智能技术合成人脸、声音、视频等内容，使虚假信息看起来像真实内容。它可以用于影视特效等正当场景，也可能被用于诈骗、造谣和侵犯隐私。";
  }

  if (type === "face") {
    text = "AI换脸是深度伪造的一种形式，可以把一个人的脸替换到另一个视频或图片中。未经同意使用他人面部形象，可能侵犯肖像权和人格尊严。";
  }

  if (type === "voice") {
    text = "语音克隆是指利用 AI 模仿某个人的声音。诈骗分子可能通过公开音频训练模型，伪造熟人、老师或领导的声音。";
  }

  if (type === "privacy") {
    text = "隐私保护要求我们不要随意上传身份证号、手机号、银行卡号、家庭住址、同学照片等敏感信息。使用 AI 工具时，也要注意保护自己和他人的隐私。";
  }

  if (type === "credit") {
    text = "学术诚信要求我们合理使用 AI。AI 可以辅助整理思路、检查表达和解释知识点，但不能直接代替自己完成作业或报告。";
  }

  resultBox.innerText = text;
}