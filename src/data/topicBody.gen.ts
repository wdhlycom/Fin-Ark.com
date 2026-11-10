// 自动生成，勿手改。
// 来源：deliverables/topic-body-<lang>/*.md
// 重新生成：node scripts/gen-topic-body.mjs
import type { Lang } from '../i18n/types';

export type TopicBodySection = {
  heading: string;
  paragraphs: string[];
};

export type TopicBody = {
  lead: string;
  sections: TopicBodySection[];
};

export const TOPIC_BODY: Record<string, Partial<Record<Lang, TopicBody>>> = {
  'gold-storage': {
    zh: {
      lead: '买完实物黄金，真正决定它是不是属于我们的，是放在哪里、按谁的规则保管。这件事看起来是物流问题，实际上是法律管辖问题：金价涨跌我们管不了，但「极端情况下能不能拿到手」是买之前就能安排好的。下面把存放这件事拆成几层，从手里拿的是什么，到存哪儿、怎么取、留多少。',
      sections: [
        { heading: '先分清手里是黄金，还是一张兑付承诺', paragraphs: [
          '纸黄金、黄金账户、黄金 ETF、以及这两年常提到的代币化黄金，价格都跟着金价走，但我们拿到的是对发行方或托管方的一份权利，不是那块金属本身。金条、金币这类实物，拿的是物权，不依赖任何机构将来还钱。',
          '两种东西不是谁好谁坏，用途不一样。要交易方便、要小额进出、要能快速变现，账户类更顺手；要的是「谁也批不准、谁也冻不了」的兜底，只有实物能做到。最简单的检验办法，是假设最难的那一天，把「不经过任何机构同意、不排队等兑付就把东西拿到手」这件事需要哪些步骤过一遍。步骤里只要还卡着别人，手里那份就更接近债权，而不是黄金。',
          '现实里多半是两种都留一点，按场景分：日常要动用的走账户，压箱底那部分走实物。把它们混成一句「我买了黄金」，最容易在要用的那天发现拿不出来。',
        ] },
        { heading: '存哪儿，比存多少更要紧', paragraphs: [
          '存放的风险有三层，一层比一层容易被忽略。',
          '第一层是物理风险：盗、火、水、搬家时弄丢。家里自存能自己控制，但也就把全部风险压在同一个地址。第二层是机构风险：保管方经营出问题、内部操作出错、保管合同里对赔付范围的限定。银行的保险箱尤其要看清楚，它租的是一个空间，通常不核验内容物，也不按金条价值赔付，是否另买保险要单独确认。第三层是司法辖区风险：资本管制、申报要求、冻结或征用，以及继承人将来要走的认证程序。这层平时完全看不出来，一出事就是全部。',
          '香港和新加坡常被放在一起比较，真正的差别不在哪一个更安全，而在它们把第三层风险分散到了不同的规则体系里。跨地保管的意义不是把金子藏起来，是让同一个命令管不到全部。代价也很实在：按年计的保管费、取用要预约和身份核验、最低提货规格，以及持有境外资产带来的申报义务。这些成本该在买之前算，而不是买完之后才发现。',
        ] },
        { heading: '取用、继承和变现，三道坎都在后面', paragraphs: [
          '买的时候最顺，麻烦都留在后面。取出通常要本人、要预约、要身份证明，规格不标准还可能要先熔铸或检验。继承更慢：境外保管的黄金是遗产的一部分，继承人要完成的认证流程往往比境内资产长，如果家里没人知道有这笔资产、找不到凭证和清单，时间会拉得更久。变现也不是按当天金价卖就行，回购渠道、成色检验、买卖价差都会吃掉一截，小规格和非标准金条被压价更常见。',
          '所以我们习惯把几句话写进家庭档案：东西由谁保管、凭证放在哪、真到那天谁去拿、拿到之后卖给谁。工具选得多讲究，都替代不了这份清单。',
        ] },
        { heading: '留多少，以及不该指望它做什么', paragraphs: [
          '黄金不产生现金流，长期也未必跑得赢能生息的资产。它在家庭资产里承担的是保险，不是收益，5% 这类比例是兜底的锚，不是对金价的判断。真要发挥作用，得有能持续产生现金流的资产和它做搭档，让波动来的时候我们不必卖掉金子过日子。',
          '用预测金价来决定比例，多半会把这件事做反：涨了追、跌了砍，最后留下的既不是保险也不是投资。',
        ] },
        { heading: '下面这几篇，按什么顺序读', paragraphs: [
          '收录的文章大致分四组。第一组讲纸黄金与实物金条的差别、以及黄金到底算投资还是保险；第二组落在保管地上，对比香港与新加坡、家里自存，也讲香港为什么要争国际黄金储备中心的位置；第三组是代币化黄金在改什么、水贝和香港各自做什么，以及比特币被叫作数字黄金的机构逻辑；最后一组回到家里该留 5% 的判断。先读保管，再读比例，顺序反了容易把「存哪儿」当成买完再想的小事。',
        ] },
      ],
    },
    en: {
      lead: 'Where physical gold is kept, and under whose rules, is what decides whether it is really ours. It looks like a logistics question; in practice it is a jurisdiction question. We cannot control the price, but whether we can actually lay hands on the metal on the worst day is something we can arrange before we buy. This page works through the layers: what we are holding, where it sits, how we get it out, and how much belongs in a family balance sheet.',
      sections: [
        { heading: 'Gold in the hand, or a promise to deliver gold', paragraphs: [
          'Paper gold, gold accounts, gold ETFs and the tokenised gold now being discussed all track the price, but what we hold is a claim on an issuer or a custodian, not the metal. Bars and coins are property. No institution has to make good on them.',
          'Neither is better in the abstract; they serve different purposes. Accounts win on liquidity, small sizes and quick trading. Only physical metal works as the backstop that no one can veto or freeze. A simple test is to walk through the steps of taking delivery on the worst day, without any institution\'s approval and without waiting in a redemption queue. If someone else is still in that chain, what we hold is closer to a receivable than to gold.',
          'Most families end up with both: an account position for anything that may need to move, and physical metal for the part meant to sit untouched. Calling both of them "I own gold" is how people discover, at the worst moment, that the wrong half is the available half.',
        ] },
        { heading: 'Where it sits matters more than how much', paragraphs: [
          'Storage carries three layers of risk, and each is easier to overlook than the last.',
          'The first is physical: theft, fire, water, loss during a move. Home storage gives control, but concentrates every risk at one address. The second is institutional: the custodian\'s solvency, internal failures, and the liability limits written into the custody contract. A bank safe deposit box rents space; the bank usually does not verify the contents or insure bullion at market value, so separate cover has to be arranged. The third is jurisdictional: capital controls, reporting duties, freezing or requisition, and the probate process heirs will face. That layer is invisible in normal times and decisive when it matters.',
          'Hong Kong and Singapore are usually compared on which is safer. The real difference is that they place that third layer under different rulebooks. Geographic diversification is not about hiding gold; it is about making sure a single order cannot reach all of it. The costs are equally real: annual storage fees, appointments and identity checks on withdrawal, minimum bar sizes for delivery, and the reporting obligations that come with holding assets abroad. All of it belongs in the calculation before purchase, not after.',
        ] },
        { heading: 'Withdrawal, inheritance and resale: the friction is all at the back end', paragraphs: [
          'Buying is the easy part. Withdrawal normally means the owner in person, an appointment, identity documents, and sometimes assaying or recasting bars that are not standard. Inheritance is slower: gold held abroad forms part of the estate, and the authentication and probate steps heirs must complete often take longer than for domestic assets. If nobody in the family knows the asset exists, or cannot find the receipts and the inventory, it takes longer still. Resale is not simply the spot price either: buyback channels, assay and the bid-ask spread all take a cut, and small or non-standard bars are discounted more heavily.',
          'So we write a few lines into the family file: who holds it, where the documents are, who goes to collect it, and who would buy it. No amount of clever structuring replaces that list.',
        ] },
        { heading: 'How much to hold, and what not to expect from it', paragraphs: [
          'Gold throws off no cash flow, and over long stretches it may not beat income-producing assets. Its job in a household is insurance, not return; a figure like 5% is an anchor for the worst case, not a view on price. For that role to work it needs an income-producing partner, so a downturn does not force us to sell the metal to live on.',
          'Setting the weight by forecasting the price tends to invert the whole exercise: adding after a rise, cutting after a fall, and ending up with something that is neither insurance nor investment.',
        ] },
        { heading: 'How to read the articles below', paragraphs: [
          'The collected articles fall into four groups. The first separates paper gold from physical bullion and asks whether gold is an investment or insurance at all. The second stays with custody: Hong Kong versus Singapore versus home storage, and why Hong Kong is pushing to become an international gold reserve hub. The third covers what tokenised gold actually changes, what Shui Bei does that Hong Kong does not, and the institutional logic behind calling bitcoin digital gold. The last group returns to the 5% question at home. Read custody before sizing; the other order turns "where do I keep it" into an afterthought.',
        ] },
      ],
    },
    es: {
      lead: 'Una vez comprado el oro físico, lo que decide si realmente es nuestro es dónde está custodiado y bajo qué reglas. Parece una cuestión logística; en realidad es una cuestión de jurisdicción. No controlamos el precio, pero sí podemos decidir antes de comprar si, en el peor día, podremos disponer del metal. Esta página recorre esas capas: qué tenemos en las manos, dónde se guarda, cómo se retira y cuánto conviene mantener en el patrimonio familiar.',
      sections: [
        { heading: 'Oro en la mano, o una promesa de entregar oro', paragraphs: [
          'El oro papel, las cuentas de oro, los fondos cotizados y el oro tokenizado del que se habla ahora siguen la cotización, pero lo que poseemos es un derecho frente a un emisor o un custodio, no el metal. Los lingotes y las monedas son propiedad: ninguna entidad tiene que responder por ellos.',
          'Ninguna de las dos opciones es mejor en abstracto; sirven para cosas distintas. Las cuentas ganan en liquidez, en importes pequeños y en rapidez de negociación. Solo el metal físico funciona como ese respaldo que nadie puede vetar ni congelar. La prueba más sencilla consiste en recorrer los pasos necesarios para retirarlo en el peor día, sin autorización de ninguna entidad y sin esperar una cola de reembolso. Si en esa cadena sigue habiendo alguien más, lo que tenemos se parece más a un crédito que a oro.',
          'Lo habitual es combinar ambas: una posición en cuenta para lo que pueda necesitar moverse y metal físico para la parte destinada a no tocarse. Llamar "tengo oro" a las dos cosas por igual es como descubrir, justo en el peor momento, que la mitad disponible no es la que hacía falta.',
        ] },
        { heading: 'Dónde se guarda importa más que cuánto se guarda', paragraphs: [
          'La custodia tiene tres capas de riesgo, y cada una es más fácil de pasar por alto que la anterior.',
          'La primera es física: robo, incendio, agua, extravío durante una mudanza. Guardarlo en casa da control, pero concentra todos los riesgos en una sola dirección. La segunda es institucional: la solvencia del custodio, los fallos internos y los límites de responsabilidad escritos en el contrato de custodia. Una caja de seguridad bancaria alquila un espacio; el banco normalmente no verifica el contenido ni asegura los lingotes por su valor de mercado, de modo que la cobertura hay que contratarla aparte. La tercera es jurisdiccional: controles de capital, obligaciones de información, bloqueo o requisición, y el proceso sucesorio que afrontarán los herederos. Esa capa es invisible en tiempos normales y decisiva cuando hace falta.',
          'Hong Kong y Singapur suelen compararse por cuál es más segura. La diferencia real es que sitúan esa tercera capa bajo normativas distintas. Diversificar geográficamente no consiste en esconder el oro, sino en lograr que una sola orden no alcance a todo. Los costes son igual de reales: comisiones anuales de custodia, cita previa y verificación de identidad para retirar, tamaños mínimos de entrega y obligaciones de información por mantener activos en el extranjero. Todo eso entra en el cálculo antes de comprar, no después.',
        ] },
        { heading: 'Retirada, herencia y venta: los obstáculos están al final', paragraphs: [
          'Comprar es lo fácil. Retirar suele exigir la presencia del titular, cita previa, documentación de identidad y, a veces, contraste o refundición de lingotes que no son estándar. La herencia es más lenta: el oro custodiado en el extranjero forma parte de la herencia, y los trámites de autenticación y sucesión que deben completar los herederos suelen alargarse más que con los activos nacionales. Si nadie en la familia sabe que ese activo existe, o no encuentra los justificantes y el inventario, se alarga todavía más. Vender tampoco es aplicar la cotización del día: los canales de recompra, el contraste de pureza y el diferencial entre compra y venta se llevan una parte, y las piezas pequeñas o no estándar sufren un descuento mayor.',
          'Por eso dejamos unas líneas por escrito en el archivo familiar: quién lo custodia, dónde están los documentos, quién va a recogerlo y quién lo compraría. Ninguna estructura por elegante que sea sustituye esa lista.',
        ] },
        { heading: 'Cuánto mantener, y qué no esperar del oro', paragraphs: [
          'El oro no genera flujo de caja y, en tramos largos, puede no superar a los activos que producen rentas. Su papel en una familia es el de un seguro, no el de una inversión; una cifra como el 5% es un ancla para el peor escenario, no una opinión sobre el precio. Para que cumpla esa función necesita un compañero que sí genere rentas, de modo que una caída no nos obligue a vender el metal para vivir.',
          'Fijar el peso pronosticando el precio suele invertir el planteamiento: comprar tras las subidas, recortar tras las bajadas y acabar con algo que no es ni seguro ni inversión.',
        ] },
        { heading: 'Cómo leer los artículos de abajo', paragraphs: [
          'Los artículos reunidos aquí forman cuatro grupos. El primero separa el oro papel de los lingotes y pregunta si el oro es inversión o seguro. El segundo se queda en la custodia: Hong Kong frente a Singapur y frente a guardarlo en casa, y por qué Hong Kong quiere ser un centro internacional de reservas de oro. El tercero explica qué cambia realmente el oro tokenizado, qué hace Shui Bei que Hong Kong no hace, y la lógica institucional de llamar al bitcoin «oro digital». El último vuelve a la pregunta del 5% en casa. Conviene leer primero la custodia y después el tamaño; al revés, «dónde lo guardo» queda como un detalle de última hora.',
        ] },
      ],
    },
    ar: {
      lead: 'بعد شراء الذهب المادي، ما يحدد إن كان ملكاً لنا فعلاً هو مكان حفظه والقواعد التي يخضع لها. تبدو المسألة لوجستية، لكنها في الحقيقة مسألة ولاية قضائية. لا نملك التحكم في السعر، لكننا نملك أن نقرر قبل الشراء إن كنا سنستطيع، في أسوأ يوم، الوصول إلى المعدن نفسه. تتناول هذه الصفحة الطبقات واحدةً تلو الأخرى: ما الذي نحمله، وأين يُحفظ، وكيف يُسترد، وكم ينبغي أن يحتفظ به البيت منه.',
      sections: [
        { heading: 'ذهب في اليد، أم وعد بتسليم ذهب', paragraphs: [
          'الذهب الورقي وحسابات الذهب وصناديقه المتداولة والذهب المُرمَّز الذي يكثر الحديث عنه كلها تتبع السعر، لكن ما نملكه هو حق لدى جهة الإصدار أو جهة الحفظ، لا المعدن ذاته. أما السبائك والعملات الذهبية فهي ملكية عينية، ولا تحتاج إلى أي جهة تفي بالتزام تجاهنا.',
          'لا تفوق إحدى الصورتين الأخرى بإطلاق، بل تختلف الغاية. تتفوق الحسابات في السيولة وصغر المبالغ وسرعة التداول، ولا يصلح إلا المعدن المادي كاحتياط لا يملك أحد تعطيله أو تجميده. والاختبار البسيط أن نستعرض خطوات الاستلام في أسوأ يوم، بلا موافقة من أي مؤسسة وبلا انتظار دور في الاسترداد: إن بقي طرف آخر في السلسلة، فما بأيدينا أقرب إلى دينٍ منه إلى ذهب.',
          'ينتهي الأمر عند معظم العائلات بالجمع بينهما: رصيد في حساب لما قد يحتاج إلى حركة، ومعدن مادي للجزء المعدّ للبقاء دون مساس. أما تسمية الاثنين معاً «أملك ذهباً» فهي ما يجعل المرء يكتشف، في اللحظة الأسوأ، أن النصف المتاح ليس النصف المطلوب.',
        ] },
        { heading: 'أين يُحفظ أهم من كم يُحفظ', paragraphs: [
          'للحفظ ثلاث طبقات من المخاطر، وكل طبقة أسهل في الإغفال من سابقتها.',
          'الأولى مادية: السرقة والحريق والماء والضياع أثناء النقل من منزل إلى آخر. الحفظ في المنزل يمنحنا السيطرة، لكنه يركّز كل المخاطر في عنوان واحد. والثانية مؤسسية: ملاءة جهة الحفظ، والأخطاء الداخلية، وحدود المسؤولية المنصوص عليها في عقد الحفظ. وصندوق الأمانات في البنك هو تأجير حيّز لا أكثر؛ فالبنك عادةً لا يتحقق من المحتوى ولا يؤمّن السبائك بقيمتها السوقية، ولا بد من ترتيب تغطية منفصلة. والثالثة قضائية: ضوابط رأس المال، وواجبات الإقرار، والتجميد أو الاستيلاء، وإجراءات الإرث التي سيواجهها الورثة. وهذه الطبقة لا تُرى في الأوقات العادية، لكنها هي الحاسمة حين يلزم الأمر.',
          'كثيراً ما تُقارَن هونغ كونغ وسنغافورة من زاوية أيّهما أكثر أمناً. والفرق الحقيقي أنهما تضعان الطبقة الثالثة تحت منظومتين مختلفتين من القواعد. والتوزيع الجغرافي ليس إخفاءً للذهب، بل هو ضمان ألا يصل أمر واحد إلى الكل. وفي المقابل تكاليف حقيقية: رسوم حفظ سنوية، ومواعيد وتحقق من الهوية عند السحب، وحد أدنى لأحجام السبائك القابلة للتسليم، والتزامات إقرار تترتب على حيازة أصول في الخارج. كل هذا يُحسب قبل الشراء لا بعده.',
        ] },
        { heading: 'السحب والميراث وإعادة البيع: العقبات كلها في النهاية', paragraphs: [
          'الشراء هو الجزء اليسير. أما السحب فيتطلب عادةً حضور المالك وموعداً وإثبات هوية، وقد يتطلب فحص العيار أو إعادة الصهر للسبائك غير القياسية. والميراث أبطأ: الذهب المحفوظ في الخارج جزء من التركة، وخطوات التوثيق وحصر الإرث التي يكملها الورثة كثيراً ما تطول مقارنةً بالأصول المحلية. وإن لم يكن أحد في العائلة يعلم بوجود الأصل، أو لم يجد الإيصالات وقائمة المحتويات، طالت المدة أكثر. وإعادة البيع ليست السعر الفوري أيضاً؛ فقنوات إعادة الشراء وفحص العيار وهامش البيع والشراء تقتطع جميعها نصيباً، والسبائك الصغيرة أو غير القياسية تُخصم أكثر.',
          'لذلك نُثبت بضعة أسطر في ملف العائلة: مَن يتولى الحفظ، وأين المستندات، ومَن يذهب للاستلام، ومَن يشتري بعد ذلك. ولا تُغني أيّ بنية متقنة عن هذه القائمة.',
        ] },
        { heading: 'كم نحتفظ، وما لا ينبغي انتظاره من الذهب', paragraphs: [
          'الذهب لا يولّد تدفقاً نقدياً، وقد لا يتفوق على الأصول المُدرّة للدخل على المدى الطويل. وظيفته في ميزانية الأسرة تأمين لا عائد؛ فنسبة كالخمسة في المئة مرساةٌ للسيناريو الأسوأ، لا رأيٌ في السعر. ولكي يؤدي هذا الدور يحتاج إلى شريك يدرّ دخلاً، حتى لا تضطرنا موجة هبوط إلى بيع المعدن لنعيش منه.',
          'أما تحديد الوزن بتوقّع السعر فيقلب المسألة رأساً على عقب: شراء بعد الارتفاع وتقليص بعد الانخفاض، ثم انتهاء المطاف بشيء لا هو تأمين ولا هو استثمار.',
        ] },
        { heading: 'كيف تقرأ المقالات أدناه', paragraphs: [
          'تتوزع المقالات المجموعة هنا على أربع مجموعات. الأولى تفرّق بين الذهب الورقي والسبائك المادية، وتسأل أصلاً إن كان الذهب استثماراً أم تأميناً. والثانية تبقى عند الحفظ: هونغ كونغ مقابل سنغافورة مقابل المنزل، ولماذا تسعى هونغ كونغ إلى مركز دولي لاحتياطي الذهب. والثالثة تشرح ما يغيّره الذهب المُرمَّز فعلاً، وما تقوم به شوي بي ولا تقوم به هونغ كونغ، والمنطق المؤسسي وراء وصف البيتكوين بالذهب الرقمي. والأخيرة تعود إلى سؤال الخمسة في المئة داخل البيت. اقرأ الحفظ قبل التحديد؛ فالعكس يجعل من «أين أضعه» تفصيلاً يُترك للحظة الأخيرة.',
        ] },
      ],
    },
  },
  'trust-succession': {
    zh: {
      lead: '传承要安排的从来不只是「钱给谁」，而是谁在什么条件下、按什么节奏、拿到多少，以及中途出变故时听谁的。信托、保险、遗嘱各管其中一段，多数争论来自把三样东西放在同一张表里比高低。先把各自管什么拆清楚，门槛和成本才有意义。',
      sections: [
        { heading: '三样工具，管的不是同一件事', paragraphs: [
          '遗嘱管的是意愿表达：谁分什么、谁是执行人。写起来便宜、随时能改，但它只在身故之后生效，要经过认证或继承程序，而且是一次性分配。钱交出去之后怎么花、被谁拿走、遇上婚姻或债务纠纷怎么办，遗嘱管不了。',
          '保险管的是现金流和受益人：金额相对确定、给付快、可以指定比例和顺位，在不少情形里能绕开一部分继承程序。它的短板是控制力弱，赔偿一到受益人手里，合同就结束了。想写「二十五岁前只给教育和生活费」「创业失败不影响孙辈那份」，保单条款给不出这种颗粒度。',
          '信托管的是控制权和分配条件。资产的法律所有权交给受托人，按信托契约约定给付，可以跨代、可以设条件、可以换受托人、也可以覆盖房产和股权。代价是设立费、每年的管理费，以及税务、法务、报表这些持续要有人管的治理成本。',
          '所以真实安排往往是组合：用遗嘱兜住没写进其他工具的零散财产，用保险解决身故当下的现金和受益人，用信托解决需要长期约束的那部分。三选一的问法本身就问错了。',
        ] },
        { heading: '门槛不在资产数字，在要解决的问题', paragraphs: [
          '常见话术喜欢给一条线，说资产过多少才配设信托。这条线其实不成立。真正的门槛是三笔账加起来：一次性的设立成本与每年的固定开支；治理上要有人持续对接受托人、税务和法务；以及资产本身能不能装进去、装进去要付什么代价，权属、税务、跨境安排都得先理清。',
          '比数字更值得看的是需求信号。出现下面几类情况，保险和遗嘱通常不够用：受益人是未成年人或有长期照护需要；要防挥霍、防婚变分割、防债务追索；资产散在不同司法辖区，继承要各走一套程序；有企业股权要安排接班和控制权；要给尚未出生的人留份额。反过来，如果全部需求只是「想给谁就给谁、金额写清楚」，一份保单加一份遗嘱多半已经够用，多设一层架构只是多一份年度账单。',
        ] },
        { heading: '「穷人的家族信托」成立在哪，不成立在哪', paragraphs: [
          '这个说法指的是香港保单能用很低的成本，替掉信托的一部分功能：保单可以拆成几份分给不同子女，可以更换受保人把时间往后延，可以指定第二投保人或后备持有人避免投保人身故后合同卡住，身故赔偿还能选分期或按条件给付。这些机制对付「怎么分、分给谁、别一次给完」确实管用，成本对比才是这句话的关键。',
          '边界同样清楚。保单给付是合同条款写死的，不能像信托契约那样自由设条件，也不能中途换掉受托人；它只覆盖这张保单里的资产，装不进房产、股权、境内外其他账户；跨境继承该走的认证程序不会因为买了保险就消失，CRS 下的信息交换和申报义务也一样要单独算。把这个说法理解成「买了保险等于有了信托」，后面往往会漏掉最关键的那几块。',
          '判断办法很朴素：先把自己家里真正要解决的问题一条条写下来，再拿这些功能去对。够用就别加层，不够用就老实承认哪几条必须靠正式架构。',
        ] },
        { heading: '跨境这一层，最容易被漏掉', paragraphs: [
          '资产在哪个法域、继承人是什么税务居民、身故时按哪套规则做认证，是三个分开的问题，不能靠一句「都安排好了」带过。信息交换不等于要补税，但申报义务要提前算清楚，别让家人在最忙的时候才第一次听说有这笔资产。',
          '比工具更管用的，往往是一份能被人找到的清单：有哪些账户和保单、凭证在哪、受益人怎么指定、谁负责去办手续、以及在哪个环节需要找专业人士。我们见过太多结构做得漂亮、家里却没人知道从哪下手的安排。',
        ] },
        { heading: '下面这几篇，按什么顺序读', paragraphs: [
          '收录的文章分三组：先是三种工具的效率对比、信托的真实门槛，以及新加坡 VCC 那类架构的成本；接着是保单拆分、更换受保人、身故赔偿支付选项这些替代机制，和代际防火墙怎么搭；最后是中国式家族办公室为什么绕不开离岸、财富传承里最常见的陷阱。先看对比和门槛，再回头看自家需求清单，比一上来研究架构省时间。',
        ] },
      ],
    },
    en: {
      lead: 'Succession is rarely about who gets the money. It is about who receives it, under what conditions, on what schedule, and who decides when something goes off plan. Trusts, insurance and wills each govern one part of that. Most arguments come from ranking the three against each other on a single scale. Once we separate what each one actually does, the thresholds and the costs start to make sense.',
      sections: [
        { heading: 'Three tools, three different jobs', paragraphs: [
          'A will expresses wishes: who receives what, and who acts as executor. It is cheap to draft and easy to change, but it only takes effect at death, it goes through probate or an equivalent process, and it makes a one-off distribution. It cannot govern how the money is spent afterwards, or shield it from a marriage breakdown, creditors or poor decisions.',
          'Insurance governs cash flow and named beneficiaries. The amount is relatively certain, payment is quick, proportions and contingent beneficiaries can be specified, and in many cases part of the probate process is bypassed. Its weak point is control: once the death benefit reaches the beneficiary, the contract is finished. Clauses such as "education and living costs only until age twenty-five" or "a failed business must not touch the grandchildren\'s share" cannot be written into a policy.',
          'A trust governs control and distribution conditions. Legal ownership passes to a trustee, payments follow the trust deed, and the arrangement can span generations, set conditions, replace the trustee and hold property or company shares. The price is a setup fee, annual management charges, and the ongoing governance of tax, legal and reporting work.',
          'Real arrangements therefore tend to combine them: a will for the odds and ends not placed elsewhere, insurance for the immediate cash and the beneficiaries at death, and a trust for the part that needs long-term constraints. Picking one of the three is the wrong question to begin with.',
        ] },
        { heading: 'The threshold is a problem list, not a number', paragraphs: [
          'Sales material likes to draw a line and say a trust only makes sense above a certain level of wealth. That line does not hold. The real threshold is three bills added together: one-off setup costs plus fixed annual charges; the governance work of dealing continuously with trustees, tax advisers and lawyers; and whether the assets can be placed into the structure at all, including title, tax and cross-border costs of getting them there.',
          'What deserves more attention than the number is the signal. Several situations usually outgrow insurance and a will: beneficiaries who are minors or need long-term care; protection against spendthrift habits, divorce claims or creditors; assets spread across jurisdictions, each with its own probate path; business shareholdings that need a succession and control plan; provisions for generations not yet born. If, on the other hand, the whole requirement is "this person gets this amount, written down clearly", a policy plus a will is usually enough, and another layer simply adds another annual invoice.',
        ] },
        { heading: 'Where "the poor man\'s family trust" holds, and where it does not', paragraphs: [
          'The phrase refers to a Hong Kong policy doing part of a trust\'s work at very low cost. A policy can be split into several contracts for different children, the insured can be changed to push the timeline forward, a second policyholder or backup owner can be named so the contract does not stall if the owner dies, and the death benefit can be paid in instalments or under chosen settlement options. For "how to divide it, to whom, and not all at once", these mechanisms genuinely work. The cost comparison is the whole point of the phrase.',
          'The limits are just as clear. Payouts are fixed by contract terms, not freely drafted conditions; the trustee cannot be replaced; only the assets inside that one policy are covered, not property, shares or other accounts at home and abroad; the probate steps in a cross-border estate do not disappear because a policy was bought, and reporting duties under CRS still have to be calculated separately. Reading the phrase as "buying insurance equals having a trust" is how the most important pieces get left out.',
          'The test is plain: write down the family\'s actual problems one by one, then match them against these features. If they are enough, do not add a layer. If they are not, be honest about which items need a formal structure.',
        ] },
        { heading: 'The cross-border layer is the one most often missed', paragraphs: [
          'Where the asset sits, the heir\'s tax residence, and which rules govern probate at death are three separate questions. "It is all taken care of" does not answer them. Information exchange is not the same as a tax bill, but reporting duties have to be worked out in advance, so the family is not hearing about an account for the first time at the busiest possible moment.',
          'More useful than any tool is often a list someone can actually find: which accounts and policies exist, where the documents are, how beneficiaries are designated, who handles the paperwork, and at which point professional advice is needed. We have seen plenty of beautifully built structures that nobody at home knows how to start executing.',
        ] },
        { heading: 'How to read the articles below', paragraphs: [
          'The collected articles fall into three groups. The first compares the efficiency of the three tools, the real threshold for a trust, and what a structure such as a Singapore VCC costs. The second looks at the substitute mechanisms — policy splitting, changing the insured, death benefit settlement options — and how a cross-generational firewall is assembled. The third asks why Chinese family offices keep ending up offshore, and where the common traps in wealth succession actually sit. Read the comparison and the threshold first, then go back to your own problem list; starting with the architecture costs more time.',
        ] },
      ],
    },
    es: {
      lead: 'La sucesión rara vez trata de quién recibe el dinero. Trata de quién lo recibe, bajo qué condiciones, con qué ritmo y quién decide cuando algo se desvía del plan. El fideicomiso, el seguro y el testamento cubren cada uno una parte. Casi todas las discusiones nacen de comparar los tres en una sola escala de mejor a peor. En cuanto separamos qué gobierna cada uno, los umbrales y los costes empiezan a tener sentido.',
      sections: [
        { heading: 'Tres herramientas, tres funciones distintas', paragraphs: [
          'El testamento expresa una voluntad: quién recibe qué y quién actúa como albacea. Es barato de redactar y fácil de modificar, pero solo surte efecto tras el fallecimiento, pasa por un proceso sucesorio y reparte de una sola vez. No puede regular cómo se gastará después el dinero ni protegerlo de un divorcio, de los acreedores o de las malas decisiones.',
          'El seguro gobierna el flujo de caja y los beneficiarios designados. El importe es relativamente cierto, el pago es rápido, se pueden fijar porcentajes y beneficiarios sustitutos, y en muchos casos se evita parte del proceso sucesorio. Su punto débil es el control: en cuanto el capital por fallecimiento llega al beneficiario, el contrato termina. Cláusulas como «solo educación y manutención hasta los veinticinco años» o «un negocio fallido no debe tocar la parte de los nietos» no caben en una póliza.',
          'El fideicomiso gobierna el control y las condiciones de reparto. La propiedad jurídica pasa al fiduciario, los pagos siguen lo dispuesto en la escritura y la estructura puede abarcar generaciones, imponer condiciones, sustituir al fiduciario y albergar inmuebles o participaciones societarias. El precio son los gastos de constitución, las comisiones anuales y el trabajo continuo de gobierno fiscal, jurídico y de reporte.',
          'Por eso los arreglos reales suelen combinarlos: el testamento para los bienes sueltos que no entraron en las otras vías, el seguro para el efectivo inmediato y los beneficiarios del fallecimiento, y el fideicomiso para la parte que necesita restricciones a largo plazo. Elegir una de las tres es ya una pregunta mal planteada.',
        ] },
        { heading: 'El umbral es una lista de problemas, no una cifra', paragraphs: [
          'Al material comercial le gusta trazar una raya y decir que el fideicomiso solo compensa a partir de cierto patrimonio. Esa raya no se sostiene. El umbral real es la suma de tres facturas: los costes puntuales de constitución más los gastos fijos anuales; el trabajo de gobierno de tratar de forma continua con fiduciarios, asesores fiscales y abogados; y si los activos pueden entrar en la estructura, con el coste de titularidad, fiscalidad y cruce de fronteras que eso supone.',
          'Merece más atención la señal que la cifra. Hay situaciones que normalmente desbordan al seguro y al testamento: beneficiarios menores de edad o con necesidades de cuidado prolongado; protección frente a gastos descontrolados, reclamaciones de divorcio o acreedores; activos repartidos entre jurisdicciones, cada una con su propio trámite sucesorio; participaciones empresariales que requieren un plan de relevo y de control; previsiones para generaciones todavía no nacidas. Si, en cambio, todo el requisito es «esta persona recibe este importe, por escrito y con claridad», una póliza y un testamento suelen bastar, y añadir una capa solo añade otra factura anual.',
        ] },
        { heading: 'Dónde acierta y dónde falla «el fideicomiso familiar de los pobres»', paragraphs: [
          'La expresión alude a que una póliza de Hong Kong hace parte del trabajo de un fideicomiso a un coste muy bajo. La póliza puede dividirse en varios contratos para distintos hijos, el asegurado puede cambiarse para alargar el horizonte, puede designarse un segundo tomador o un titular suplente para que el contrato no quede bloqueado si fallece el tomador, y el capital por fallecimiento puede abonarse a plazos o según opciones de liquidación elegidas. Para «cómo repartir, a quién y no de una vez», estos mecanismos funcionan de verdad. La comparación de costes es el sentido entero de la frase.',
          'Los límites son igual de claros. El pago queda fijado por las condiciones del contrato, no por cláusulas redactadas a medida; no se puede sustituir al fiduciario; solo cubre los activos dentro de esa póliza, no inmuebles, acciones ni otras cuentas dentro y fuera del país; los trámites sucesorios transfronterizos no desaparecen por haber contratado un seguro, y las obligaciones de información bajo CRS también hay que calcularlas aparte. Entender la frase como «contratar un seguro equivale a tener un fideicomiso» es la forma habitual de dejar fuera las piezas más importantes.',
          'La prueba es sencilla: anotar uno por uno los problemas reales de la familia y confrontarlos con estas funciones. Si bastan, no se añade una capa. Si no bastan, hay que reconocer con franqueza qué puntos exigen una estructura formal.',
        ] },
        { heading: 'La capa transfronteriza es la que más se olvida', paragraphs: [
          'Dónde está situado el activo, cuál es la residencia fiscal del heredero y qué normas rigen la sucesión en el momento del fallecimiento son tres preguntas distintas. «Está todo arreglado» no responde a ninguna. El intercambio de información no equivale a una liquidación tributaria, pero las obligaciones de declaración han de calcularse antes, para que la familia no oiga hablar de una cuenta por primera vez en el momento de más agobio.',
          'Más útil que cualquier herramienta suele ser una lista que alguien pueda encontrar: qué cuentas y pólizas existen, dónde están los documentos, cómo se designaron los beneficiarios, quién se encarga de los trámites y en qué punto hace falta asesoramiento profesional. Hemos visto muchas estructuras impecables que nadie en casa sabía por dónde empezar a ejecutar.',
        ] },
        { heading: 'Cómo leer los artículos de abajo', paragraphs: [
          'Los artículos reunidos se agrupan en tres bloques. El primero compara la eficiencia de las tres herramientas, el umbral real del fideicomiso y lo que cuesta una estructura como la VCC de Singapur. El segundo se detiene en los mecanismos sustitutivos —división de la póliza, cambio de asegurado, opciones de pago del capital por fallecimiento— y en cómo se levanta un cortafuegos entre generaciones. El tercero pregunta por qué las family offices chinas acaban recurriendo a estructuras offshore y dónde están las trampas habituales de la sucesión. Primero la comparación y el umbral, y después la lista propia de problemas; empezar por la arquitectura cuesta más tiempo.',
        ] },
      ],
    },
    ar: {
      lead: 'التوريث في جوهره ليس سؤال «مَن يأخذ المال»، بل مَن يأخذه، وتحت أي شروط، وبأي وتيرة، ومَن يقرر حين يخرج شيء عن الخطة. والصندوق الائتماني والتأمين والوصية يتولى كل منها جزءاً من ذلك. ومعظم الجدل ينشأ من ترتيب الثلاثة على مقياس واحد للأفضل والأسوأ. فمتى فصلنا ما يحكمه كل أداة، صار للحدود الدنيا وللتكاليف معنى.',
      sections: [
        { heading: 'ثلاث أدوات، ثلاث وظائف مختلفة', paragraphs: [
          'الوصية تعبّر عن الإرادة: مَن يأخذ ماذا، ومَن ينفّذها. رخيصة الصياغة وسهلة التعديل، لكنها لا تُعمل إلا بعد الوفاة، وتمر بإجراءات حصر التركة وإثبات الوصية، وتوزّع دفعة واحدة. ولا تستطيع أن تنظّم كيف يُنفق المال بعدئذ، ولا أن تحميه من نزاع زوجي أو مطالبة دائن أو قرار خاطئ.',
          'والتأمين يحكم التدفق النقدي وتسمية المستفيدين: المبلغ شبه معلوم، والدفع سريع، ويمكن تحديد الأنصبة والمستفيدين البدلاء، ويُتجاوز في كثير من الحالات جزء من إجراءات التركة. لكن نقطة ضعفه هي السيطرة؛ فما إن يصل تعويض الوفاة إلى المستفيد حتى ينتهي العقد. ولا يمكن إدراج شرط مثل «الإنفاق على التعليم والمعيشة فقط حتى الخامسة والعشرين» أو «ألا يمسّ تعثّر العمل نصيب الأحفاد» في وثيقة تأمين.',
          'والصندوق الائتماني يحكم السيطرة وشروط التوزيع: تنتقل الملكية القانونية إلى الأمين، وتجري المدفوعات وفق عقد الصندوق، ويمكن أن يمتد لأجيال، ويضع شروطاً، ويستبدل الأمين، ويحتوي عقارات أو حصصاً في شركات. والثمن رسوم تأسيس، وأتعاب إدارية سنوية، وعمل حوكمة مستمر في الضرائب والشؤون القانونية والإقرارات.',
          'لذلك تميل الترتيبات الواقعية إلى الجمع بينها: الوصية للأصول المتفرقة التي لم تدخل في الأداتين الأخريين، والتأمين للسيولة العاجلة وللمستفيدين عند الوفاة، والصندوق للجزء الذي يحتاج قيوداً طويلة الأمد. أما اختيار واحدة من الثلاث فسؤال مغلوب من أصله.',
        ] },
        { heading: 'الحد الأدنى قائمة مشكلات، لا رقم', paragraphs: [
          'يحبّ الخطاب التجاري أن يرسم خطاً ويقول إن الصندوق لا يجدي إلا بعد مستوى معيّن من الثروة. وهذا الخط لا يصمد. فالحد الحقيقي مجموع ثلاث فواتير: تكاليف التأسيس لمرة واحدة مضافاً إليها المصروفات الثابتة السنوية؛ وعمل الحوكمة في التعامل الدائم مع الأمين والمستشار الضريبي والمحامي؛ وإمكان إدخال الأصول أصلاً في البنية، بما في ذلك تكلفة الملكية والضرائب والعبور بين الولايات القضائية.',
          'وأولى من الرقم بالنظر هي الإشارات. فثمة أوضاع تتجاوز عادةً التأمين والوصية: مستفيدون قصّر أو ذوو احتياجات رعاية طويلة؛ حماية من التبذير أو من مطالبات الطلاق أو الدائنين؛ أصول موزّعة على ولايات قضائية لكل منها مسارها في الإرث؛ حصص في شركة تحتاج خطة لانتقال الإدارة والسيطرة؛ ترتيبات لأجيال لم تولد بعد. أما إن كان كل المطلوب هو «هذا الشخص يأخذ هذا المبلغ، مكتوباً بوضوح»، فوثيقة تأمين ووصية تكفيان غالباً، وأي طبقة إضافية تعني فاتورة سنوية إضافية لا أكثر.',
        ] },
        { heading: 'أين يصدق «صندوق العائلة للفقراء» وأين لا يصدق', paragraphs: [
          'المقصود أن وثيقة تأمين في هونغ كونغ تؤدي جزءاً من عمل الصندوق الائتماني بكلفة منخفضة جداً: يمكن تجزئة الوثيقة إلى عقود لعدة أبناء، وتغيير المؤمَّن عليه لتمديد الأفق الزمني، وتسمية حامل ثانٍ أو مالك بديل حتى لا يتعطل العقد إذا توفي الحامل، كما يمكن دفع تعويض الوفاة على دفعات أو وفق خيارات تسوية مختارة. وهذه الآليات تنجح فعلاً في «كيف نُقسّم، ولمن، وليس دفعة واحدة»، والمقارنة في الكلفة هي مغزى العبارة كله.',
          'والحدود واضحة بالقدر نفسه: المدفوعات محكومة بشروط العقد لا ببنود تُصاغ بحرية، ولا يمكن استبدال الأمين، ولا يغطي الترتيب إلا الأصول داخل تلك الوثيقة، لا العقارات ولا الأسهم ولا الحسابات الأخرى في الداخل والخارج؛ وإجراءات الإرث العابر للحدود لا تزول لمجرّد شراء وثيقة، والتزامات الإقرار في إطار CRS تُحسب على حدة. أمّا فهم العبارة على أن «شراء التأمين يعني وجود صندوق» فهو الطريق المعتاد لإغفال أهم القطع.',
          'والاختبار بسيط: نكتب مشكلات الأسرة الحقيقية واحداً واحداً، ثم نقابلها بهذه الوظائف. فإن كفت، لا نضيف طبقة. وإن لم تكفّ، نُقرّ بصراحة بالبنود التي تحتاج بنية رسمية.',
        ] },
        { heading: 'الطبقة العابرة للحدود أكثر ما يُنسى', paragraphs: [
          'أين يقع الأصل، وما الإقامة الضريبية للوارث، وأي قواعد تحكم التركة لحظة الوفاة: ثلاثة أسئلة منفصلة، ولا يجيب عنها قول «الأمر مرتّب كله». وتبادل المعلومات ليس فاتورة ضريبية، لكن واجبات الإقرار تُحسب مقدّماً، حتى لا تسمع الأسرة بوجود حساب لأول مرة في أكثر اللحظات ازدحاماً.',
          'وكثيراً ما أنفع من كل أداة قائمة يعثر عليها أحدهم: أي حسابات ووثائق قائمة، وأين المستندات، وكيف سُمّي المستفيدون، ومَن يتولى الإجراءات، ومتى يلزم الرأي المهني. وقد رأينا بنيات متقنة البناء لا يعرف أحد في البيت من أين يبدأ تنفيذها.',
        ] },
        { heading: 'كيف تقرأ المقالات أدناه', paragraphs: [
          'تتوزع المقالات المجموعة على ثلاث مجموعات. الأولى تقارن كفاءة الأدوات الثلاث، والحد الحقيقي للصندوق الائتماني، وما تكلّفه بنية كـ VCC في سنغافورة. والثانية تتوقف عند الآليات البديلة — تجزئة الوثيقة، وتغيير المؤمَّن عليه، وخيارات دفع تعويض الوفاة — وكيف يُبنى جدار حماية بين الأجيال. والثالثة تسأل لماذا ينتهي المطاف بمكاتب العائلات الصينية إلى الخارج، وأين تقع فخاخ التوريث المعتادة. ابدأ بالمقارنة والحد الأدنى، ثم عد إلى قائمة مشكلاتك؛ فالبدء بالبنية يستهلك وقتاً أكثر.',
        ] },
      ],
    },
  },
  'dividend-fulfillment': {
    zh: {
      lead: '计划书上那个 6% 或 7%，是演示，不是承诺。分红实现率（也有叫红利实现率、履行比率）是事后唯一能拿来核对演示的公开标尺。会用这个数字，能避开大半销售话术；但只盯这个数字，也会漏掉更要紧的东西。下面把它能说明什么、不能说明什么，一层层拆开。',
      sections: [
        { heading: '这个比率在比什么，以及 100% 不代表什么', paragraphs: [
          '分子是实际派发的非保证红利，分母是销售当时演示的非保证红利，保证部分不进这个算式。于是 100% 的意思很窄：非保证那一块按当初演示发了。它既不代表总收益达到演示，也不代表这张保单的保证比例高，更不代表同业里最划算。',
          '几个口径要先分开。同一家公司不同产品系列、不同保单年度、不同币种的实现率要各看各的，不能拿一张表概括全线。保单早期非保证红利在总价值里占得很小，头几年实现率再漂亮，对最后拿到多少钱影响也有限，真正拉开差距的是二三十年之后。披露口径和逐年数据以保险公司官网、监管公开资料为准，销售转述的截图和「我们家一直 100%」这类话，都不该当依据。',
        ] },
        { heading: 'IRR 和「多拿 1%」不是一回事', paragraphs: [
          'IRR 是把不同年份的现金流折成一个年化数，它随时间在变：第十年、第二十年、第三十年读出来的 IRR 差别很大。演示表上那个 6%-7%，通常指长期持有到某个年度的演示 IRR，前面年份远低于它，越早退出离得越远。',
          '所以「高一个点」这句话要挂上前提才成立：分红大致按演示派发、中途不退保、不减额、不做保单贷款、汇率没有大幅不利变化，而且这笔钱真的能放那么久。少一条，复利的放大效应就会被抹掉一截。反过来，中途退保是这套模型最直接的敌人——前期现金价值偏低，一退不只是损失一点收益，是把时间整段砍掉。',
          '看计划书时更实用的动作，是把同一年度的「保证现金价值」和「非保证现金价值」分开抄下来，再拿实现率去压一压非保证那一列。这样算出来的数，比直接相信最后一行的演示 IRR 靠谱得多。',
        ] },
        { heading: '拿实现率做比较，有三个坑', paragraphs: [
          '跨公司比，演示基准不一样。各家用的投资回报假设、分红锁定与平滑政策都不同，同样写 100%，含金量可能差不少。跨币种比也一样，美元、港币、人民币保单的演示利率和分红政策本就不是一套。跨时间比更隐蔽，老产品当年的演示口径和新产品不同，用今天新单的实现率去推十年前那张单，方向就错了。',
          '比较稳的用法是收窄范围：同一家公司、同一个产品系列、连续多个保单年度看趋势，再对照自家保单的年份和币种。单年数字只适合排除明显异常，不适合排优劣。',
        ] },
        { heading: '6%-7% 的长期复利，要哪些条件同时成立', paragraphs: [
          '至少五件事得一起成立：持有期限够长且中途不动；非保证部分大致按演示派发；币种和汇率不发生持续的不利变化；没有提前退保、减额或用保单借款打断现金价值积累；以及家庭现金流允许这笔钱真的被锁这么久。任何一条松动，账面和到手之间就会出现缺口。',
          '把香港分红险和内地增额终身寿、年金险放在同一张桌上，差别主要在保证比例、币种和分红机制，不在演示表第一行的数字。内地产品保证成分更重，港险把更多空间放在非保证分红上，换来获取更高长期演示的可能，同时也承担了实现率波动。这也是为什么看港险必须同时看保证那一列，只比演示数字等于比谁更敢写。',
          '还有一层常被跳过的：收费结构。同样叫长期理财，规模导向的产品往往在发行时点、换仓频率和各类费用上悄悄吃掉收益，这部分和分红实现率无关，却真实影响最后到手的钱。',
        ] },
        { heading: '下面这几篇，按什么顺序读', paragraphs: [
          '收录的文章从三条线进来：分红实现率的计算口径和三个常见误区、6%-7% 复利到底从哪来；新加坡 IUL、美国 IUL 与香港分红险的对照，以及港险和内地年金、增额终身寿三十年后的差别；最后是理财产品为什么总不赚钱，从收费模式那一侧补齐视角。先读口径，再读对比，最后读成本，顺序反了容易被演示数字牵着走。',
        ] },
      ],
    },
    en: {
      lead: 'The 6% or 7% in an illustration is a projection, not a promise. The dividend fulfillment ratio — also called the bonus fulfillment or fulfilment ratio — is the only public yardstick for checking that projection after the fact. Knowing how to read it defuses most of the sales pitch. Stopping at that single number, though, misses things that matter more. Here is what the figure does and does not tell us, layer by layer.',
      sections: [
        { heading: 'What the ratio compares, and what 100% does not mean', paragraphs: [
          'The numerator is the non-guaranteed bonuses actually paid; the denominator is the non-guaranteed bonuses illustrated at the point of sale. Guaranteed benefits sit outside the calculation altogether. So 100% means something narrow: the non-guaranteed portion was paid as illustrated. It does not mean the total return met the illustration, does not mean the guaranteed portion is high, and does not mean the product is the best value in the market.',
          'Several definitions have to be kept apart. Within one insurer, different product lines, different policy years and different currencies each have their own ratio; a single table cannot summarise the whole range. In the early years the non-guaranteed bonus is a small part of total value, so an impressive ratio in year three says little about what is finally received — the gap opens up twenty or thirty years later. Disclosure bases and year-by-year figures should come from the insurer\'s own website and the regulator\'s published material, not from a forwarded screenshot or a claim that "we have always paid 100%".',
        ] },
        { heading: 'IRR is not the same as "one extra percent"', paragraphs: [
          'IRR folds cash flows from different years into a single annualised number, and it changes with time: the figure read at year ten, year twenty and year thirty are very different. The 6-7% in a brochure is normally the illustrated IRR at a distant holding year. Earlier years sit well below it, and the earlier we exit, the further away we are from it.',
          'That is why "one point higher" only works with its assumptions attached: bonuses broadly paid as illustrated, no surrender, no reduction in coverage, no policy loan, no sustained adverse currency move, and money that can genuinely stay locked for that long. Remove one and the compounding effect shrinks. Surrender is the most direct enemy of the model — early cash values are low, so exiting does not merely trim a bit of return, it cuts off the time entirely.',
          'A more useful habit when reading an illustration is to copy out the guaranteed and non-guaranteed cash values for the same policy year separately, then apply a haircut to the non-guaranteed column using the fulfillment ratio. That number is more trustworthy than the illustrated IRR on the final line.',
        ] },
        { heading: 'Three traps when comparing ratios', paragraphs: [
          'Comparing across insurers assumes shared assumptions. Each company uses its own investment return assumptions, bonus locking and smoothing policies; two products both showing 100% can be very different in substance. The same applies across currencies: USD, HKD and CNY policies do not share illustrated rates or bonus policies. Comparing across time is subtler — older products were illustrated on a different basis, so using a new policy\'s ratio to infer what a ten-year-old contract will pay gets the direction wrong.',
          'The safer approach is to narrow the frame: one insurer, one product series, several consecutive policy years, matched to the year and currency of the policy actually held. A single year\'s figure is useful for spotting an obvious anomaly, not for ranking products.',
        ] },
        { heading: 'What has to hold for 6-7% long-term compounding', paragraphs: [
          'At least five things have to be true at once: a long, undisturbed holding period; non-guaranteed bonuses broadly in line with the illustration; no sustained adverse move in currency; no early surrender, reduction or policy loan interrupting the build-up of cash value; and household cash flow that genuinely allows the money to be locked away that long. Loosen any one and a gap opens between the brochure and the money received.',
          'Set Hong Kong participating policies alongside mainland increasing whole life and annuity products and the difference lies mainly in the guaranteed portion, the currency and the bonus mechanism — not in the first line of the illustration. Mainland products carry a heavier guarantee; Hong Kong policies place more of the space in non-guaranteed bonuses, buying the possibility of a higher long-term illustration while also taking on fulfillment volatility. That is exactly why the guaranteed column has to be read alongside it; comparing illustrations alone is comparing who is willing to print the bigger number.',
          'One more layer is usually skipped: the fee structure. Among products that all call themselves long-term savings, those driven by scale quietly lose return through issuance timing, portfolio turnover and layered charges. None of that shows up in a fulfillment ratio, and all of it affects what finally arrives.',
        ] },
        { heading: 'How to read the articles below', paragraphs: [
          'The collected articles come in on three lines: the calculation of the fulfillment ratio and its three common misreadings, and where the 6-7% compounding actually comes from; the comparison between Singapore IUL, US IUL and Hong Kong participating policies, plus how Hong Kong policies and mainland annuities and increasing whole life look thirty years out; and finally why wealth products so often fail to make money, which completes the picture from the cost side. Read the definitions first, then the comparisons, then the costs; reversing the order lets the illustrated numbers lead.',
        ] },
      ],
    },
    es: {
      lead: 'El 6% o el 7% que aparece en una ilustración es una proyección, no una promesa. El ratio de cumplimiento de dividendos —también llamado ratio de cumplimiento de bonificaciones— es la única vara pública con la que comprobar esa proyección después del hecho. Saber leerlo desactiva gran parte del discurso comercial. Quedarse solo en esa cifra, en cambio, deja fuera cosas que pesan más. Aquí va, capa por capa, qué dice y qué no dice.',
      sections: [
        { heading: 'Qué compara el ratio, y qué no significa un 100%', paragraphs: [
          'El numerador son las bonificaciones no garantizadas efectivamente repartidas; el denominador, las bonificaciones no garantizadas que se ilustraron en el momento de la venta. Las prestaciones garantizadas quedan fuera del cálculo. Así que un 100% significa algo estrecho: la parte no garantizada se abonó tal como se ilustró. No significa que la rentabilidad total alcanzara la proyección, ni que la parte garantizada sea alta, ni que el producto sea el mejor del mercado.',
          'Hay que separar varios criterios. Dentro de una misma aseguradora, cada línea de producto, cada año de póliza y cada divisa tiene su propio ratio; una sola tabla no resume todo el conjunto. En los primeros años la bonificación no garantizada es una parte pequeña del valor total, así que un ratio brillante en el año tres dice poco sobre lo que se acabará cobrando: la diferencia se abre veinte o treinta años después. Los criterios de divulgación y las series anuales deben tomarse de la web de la propia aseguradora y de las publicaciones del regulador, no de una captura reenviada ni de un «siempre pagamos el 100%».',
        ] },
        { heading: 'La TIR no es lo mismo que «un punto más»', paragraphs: [
          'La TIR resume flujos de caja de distintos años en una sola cifra anualizada, y cambia con el tiempo: la lectura del año diez, del veinte y del treinta son muy distintas. El 6-7% del folleto suele ser la TIR ilustrada en un año lejano de permanencia. Los años anteriores quedan muy por debajo, y cuanto antes se salga, más lejos se está de esa cifra.',
          'Por eso «un punto más» solo funciona con sus hipótesis pegadas: bonificaciones aproximadamente según lo ilustrado, sin rescate, sin reducción de capital, sin préstamo sobre la póliza, sin un movimiento adverso sostenido del tipo de cambio y con un dinero que de verdad pueda quedarse inmovilizado tanto tiempo. Si falta una, el efecto del interés compuesto se reduce. El rescate es el enemigo más directo del modelo: los valores en efectivo iniciales son bajos, de modo que salir no recorta un poco de rentabilidad, corta el tiempo entero.',
          'Al leer una ilustración resulta más útil copiar por separado, para un mismo año de póliza, el valor en efectivo garantizado y el no garantizado, y aplicar después al segundo un recorte según el ratio de cumplimiento. Esa cifra merece más confianza que la TIR ilustrada de la última línea.',
        ] },
        { heading: 'Tres trampas al comparar ratios', paragraphs: [
          'Comparar entre aseguradoras supone compartir hipótesis. Cada compañía maneja sus propios supuestos de rentabilidad de las inversiones y sus políticas de suavizado y consolidación de bonificaciones; dos productos con un 100% pueden ser muy distintos en sustancia. Lo mismo ocurre entre divisas: las pólizas en USD, HKD y CNY no comparten tipos ilustrados ni política de bonificaciones. Comparar entre épocas es más sutil: los productos antiguos se ilustraron con otra base, así que usar el ratio de una póliza nueva para inferir qué pagará un contrato de hace diez años invierte la dirección del razonamiento.',
          'El enfoque más seguro es estrechar el marco: una aseguradora, una línea de producto, varios años consecutivos de póliza, cotejados con el año y la divisa del contrato que se posee. La cifra de un solo año sirve para detectar una anomalía evidente, no para ordenar productos de mejor a peor.',
        ] },
        { heading: 'Qué tiene que cumplirse para un 6-7% compuesto a largo plazo', paragraphs: [
          'Al menos cinco cosas a la vez: una permanencia larga y sin interrupciones; bonificaciones no garantizadas aproximadamente en línea con lo ilustrado; ausencia de un movimiento cambiario adverso sostenido; ni rescate anticipado, ni reducción, ni préstamo sobre la póliza que interrumpan la acumulación de valor en efectivo; y una tesorería familiar que permita de verdad inmovilizar ese dinero tanto tiempo. Si una afloja, se abre una brecha entre el folleto y lo que llega a la cuenta.',
          'Al poner las pólizas con participación en beneficios de Hong Kong junto a los seguros de vida entera con capital creciente y las rentas vitalicias del continente, la diferencia está sobre todo en la parte garantizada, la divisa y el mecanismo de bonificaciones, no en la primera línea de la ilustración. Los productos del continente cargan más garantía; las pólizas de Hong Kong dejan más espacio a las bonificaciones no garantizadas, comprando la posibilidad de una proyección a largo plazo más alta y asumiendo a la vez la volatilidad del cumplimiento. Justo por eso hay que leer también la columna garantizada: comparar solo ilustraciones es comparar quién se atreve a imprimir la cifra más grande.',
          'Queda una capa que casi siempre se salta: la estructura de comisiones. Entre productos que todos se llaman ahorro a largo plazo, los que se mueven por volumen pierden rentabilidad de forma silenciosa por el momento de emisión, la rotación de cartera y las comisiones acumuladas. Nada de eso aparece en un ratio de cumplimiento, y todo ello afecta a lo que finalmente se cobra.',
        ] },
        { heading: 'Cómo leer los artículos de abajo', paragraphs: [
          'Los artículos reunidos entran por tres vías: el cálculo del ratio de cumplimiento y sus tres lecturas erróneas habituales, y de dónde sale el 6-7% compuesto; la comparación entre el IUL de Singapur, el IUL estadounidense y las pólizas con participación de Hong Kong, además de cómo se ven a treinta años las pólizas de Hong Kong frente a las rentas vitalicias y los seguros de capital creciente del continente; y, por último, por qué los productos de inversión tantas veces no ganan dinero, que completa el panorama desde el lado de los costes. Primero los criterios, después las comparaciones y al final los costes; invertir el orden deja que manden las cifras ilustradas.',
        ] },
      ],
    },
    ar: {
      lead: 'الـ 6% أو 7% في جدول الإيضاحات إسقاط لا التزام. ونسبة تحقق توزيعات الأرباح — وتسمى أيضاً نسبة الوفاء بالأرباح — هي المقياس العلني الوحيد الذي نراجع به ذلك الإسقاط بعد وقوعه. وإحسان قراءتها يفكّك معظم الخطاب البيعي، لكن الاكتفاء بالرقم وحده يُغفل ما هو أهم. إليك ما يقوله الرقم وما لا يقوله، طبقةً بطبقة.',
      sections: [
        { heading: 'ماذا يقيس الرقم، وماذا لا يعني 100%', paragraphs: [
          'البسط هو الأرباح غير المضمونة التي صُرفت فعلاً، والمقام هو الأرباح غير المضمونة كما عُرضت وقت البيع، أما المزايا المضمونة فهي خارجة عن الحساب أصلاً. لذلك فإن 100% تعني شيئاً ضيقاً: الجزء غير المضمون صُرف وفق ما عُرض. لا تعني أن العائد الإجمالي بلغ الإسقاط، ولا أن نسبة المضمون مرتفعة، ولا أن المنتج هو الأفضل قيمةً في السوق.',
          'ولا بد من الفصل بين عدة مستويات. فداخل الشركة الواحدة، لكل خط إنتاج وكل سنة من عمر الوثيقة وكل عملة نسبتها الخاصة، ولا تلخّصها ورقة واحدة. وفي السنوات المبكرة تكون الأرباح غير المضمونة حصة صغيرة من القيمة الكلية، فالنسبة اللامعة في السنة الثالثة لا تقول الكثير عمّا يُقبض في النهاية؛ فالفارق يتسع بعد عشرين أو ثلاثين سنة. وتُؤخذ أسس الإفصاح والسلاسل السنوية من موقع الشركة ومنشورات الجهة الرقابية، لا من لقطة شاشة مُعادة ولا من عبارة «نحن نصرف 100% دائماً».',
        ] },
        { heading: 'معدل العائد الداخلي ليس «نقطة مئوية إضافية»', paragraphs: [
          'معدل العائد الداخلي يضغط التدفقات النقدية لسنوات مختلفة في رقم سنوي واحد، وهو يتغيّر مع الزمن: قراءة السنة العاشرة والعشرين والثلاثين متباينة جداً. والـ 6-7% في الكتيّب هو عادةً العائد الداخلي المُوضَّح عند سنة بعيدة من الاحتفاظ، والسنوات التي تسبقه أدنى منه بكثير، وكلما خرجنا مبكراً ابتعدنا عنه.',
          'لهذا لا تصح عبارة «أعلى بنقطة» إلا بشروطها ملتصقة بها: أرباح تُصرف قريباً مما عُرض، بلا تنازل مبكر، وبلا تخفيض لمبلغ التأمين، وبلا قرض بضمان الوثيقة، وبلا تحرّك سلبي مستمر في العملة، ومال يمكنه حقاً أن يبقى محبوساً تلك المدة. فإن غاب شرط، تقلّص أثر التراكم. والتنازل المبكر هو العدو المباشر للنموذج: القيم النقدية في البداية منخفضة، فالخروج لا يقتطع قليلاً من العائد، بل يقطع الزمن كله.',
          'والأنفع عند قراءة جدول الإيضاحات أن ننسخ، لسنة واحدة بعينها، القيمة النقدية المضمونة والقيمة النقدية غير المضمونة كلتيهما على حدة، ثم نُخفّض العمود الثاني بنسبة التحقق. ذلك الرقم أوثق من العائد الداخلي المُوضَّح في السطر الأخير.',
        ] },
        { heading: 'ثلاث فخاخ عند مقارنة النسب', paragraphs: [
          'المقارنة بين الشركات تفترض أساساً مشتركاً، ولكل شركة افتراضاتها لعائد الاستثمار وسياساتها في تنعيم الأرباح وتثبيتها؛ فقد يكون منتجان كلاهما عند 100% مختلفين جداً في المضمون. والأمر نفسه بين العملات: وثائق الدولار الأمريكي ودولار هونغ كونغ واليوان لا تشترك في معدلات الإيضاح ولا في سياسة الأرباح. والمقارنة عبر الزمن أخفى: المنتجات القديمة عُرضت على أساس مختلف، فاستخدام نسبة وثيقة جديدة للاستدلال على ما ستدفعه وثيقة عمرها عشر سنوات يقلب الاتجاه.',
          'والطريقة الأسلم تضييق الإطار: شركة واحدة، وخط إنتاج واحد، وعدة سنوات متتالية من عمر الوثيقة، مطابقة لسنة الوثيقة التي نملكها ولعملتها. ورقم سنة واحدة يصلح لكشف شذوذ واضح، لا لترتيب المنتجات.',
        ] },
        { heading: 'ما الذي يجب أن يتحقق معاً لتراكم 6-7% طويل الأجل', paragraphs: [
          'خمسة أمور على الأقل في وقت واحد: احتفاظ طويل دون انقطاع، وأرباح غير مضمونة قريبة مما عُرض، وغياب تحرّك سلبي مستمر في سعر الصرف، وعدم تنازل مبكر أو تخفيض أو قرض بضمان الوثيقة يقطع تراكم القيمة النقدية، وتدفق نقدي للأسرة يسمح فعلاً بحبس المال تلك المدة. فإن تراخى واحد منها، انفتحت فجوة بين الكتيّب وما يصل إلى الحساب.',
          'وحين نضع وثائق المشاركة في الأرباح في هونغ كونغ إلى جانب التأمين الكامل مدى الحياة برأس مال متزايد والمعاشات السنوية في البرّ الرئيسي، فإن الفارق يقع أساساً في الحصة المضمونة والعملة وآلية الأرباح، لا في السطر الأول من جدول الإيضاحات. فمنتجات البرّ الرئيسي تحمل ضماناً أثقل، ووثائق هونغ كونغ تترك حيّزاً أكبر للأرباح غير المضمونة، فتشتري احتمال إسقاط أعلى على المدى الطويل وتتحمل في المقابل تقلّب التحقق. ولهذا بالضبط لا بد من قراءة عمود المضمون إلى جانبه؛ فمقارنة الإيضاحات وحدها مقارنةٌ لمن يجرؤ على طباعة رقم أكبر.',
          'وتبقى طبقة كثيراً ما تُتجاوز: هيكل الرسوم. فبين منتجات تتسمى كلها بالادخار الطويل، تخسر المنتجات التي يحرّكها الحجمُ عائدها بهدوء عبر توقيت الإصدار ودوران المحفظة والرسوم المتراكمة. ولا يظهر شيء من ذلك في نسبة التحقق، لكنه جميعاً يؤثر فيما يصل في النهاية.',
        ] },
        { heading: 'كيف تقرأ المقالات أدناه', paragraphs: [
          'تدخل المقالات المجموعة من ثلاثة مسارات: حساب نسبة التحقق وثلاث قراءات خاطئة شائعة لها، ومن أين يأتي تراكم 6-7%؛ ثم المقارنة بين IUL في سنغافورة وIUL في الولايات المتحدة ووثائق المشاركة في هونغ كونغ، وبين وثائق هونغ كونغ والمعاشات السنوية والتأمين برأس مال متزايد في البرّ الرئيسي بعد ثلاثين سنة؛ وأخيراً لماذا لا تربح المنتجات المالية في الغالب، ليكتمل المشهد من جهة الكلفة. اقرأ الأسس أولاً، ثم المقارنات، ثم الرسوم؛ فالعكس يجعل الأرقام المُوضَّحة هي التي تقود.',
        ] },
      ],
    },
  },
  'multi-currency-savings': {
    zh: {
      lead: '一张香港保单里能放美元、港币、人民币，几年后还能换计价货币，这是多元货币储蓄险最核心的结构。它卖的不是「能换很多种钱」，是把几十年后的选择权提前买下来。保费融资是另一件事：在这份选择权上再加一层杠杆。两件事常被放在同一份计划书里讲，算账时必须拆开。',
      sections: [
        { heading: '「多元货币」在合同里到底指什么', paragraphs: [
          '保单会有一个签发时的基础货币，条款里写明可转换的币种清单、什么时候能转、能转几次、按什么汇率折算、收不收费。转换不是拿现货换另一种现货，而是把整张合同的计价基础换掉——后面的现金价值、分红演示、乃至身故赔偿的计量都跟着重算，这一点和普通换汇完全不是一回事。',
          '常见的约束也就藏在这几行里：有等待期，有的只在特定周年或特定窗口开放，转之前可能要先处理累积红利或锁定红利，次数也可能有限制。「能换」和「随时免费换」之间差着一整套条款。签约前把转换规则单独圈出来读一遍，比听十遍「灵活配置」有用。',
        ] },
        { heading: '换币种解决的是长期错配，不是赌汇率', paragraphs: [
          '真正用得上多币种功能的场景很具体：现在赚钱的币种，和未来要用钱的币种不是同一个。子女在哪儿读书、养老打算在哪儿过、家里有没有人已经或准备移居，这些决定几十年后支出落在哪一种货币上。保单里留几种可转换的币种，对冲的是「到用钱那天手里只有一种钱」这个风险。',
          '把它当汇率工具用就走偏了。汇率短期没法预测，转换还有窗口和成本，靠这个赚差价既慢又贵。更妥当的理解是给未来的不确定性留一条路，代价是放弃一部分确定性——分散本身不产生额外收益，它买的是不必在某一个时点被迫做决定。',
        ] },
        { heading: '保费融资把两笔账叠在了一起', paragraphs: [
          '结构不复杂：自己出一部分首付，其余由银行放贷，保单抵押给银行，用保单的预期收益去覆盖贷款利息，从而放大保额。收益端多了一层杠杆，成本端同时多了一层，麻烦就出在这两边不同步——贷款利率是浮动的，保单分红是非保证的，一个跟着市场走，一个跟着公司经营和演示走。',
          '签约前至少算清三件事。利率上行时利差倒挂，原本设想的正收益会反过来吃本金；现金价值或抵押品估值不足时被要求补钱，届时要么追加资金、要么被迫处置保单；借款币种与保单币种错配，等于在杠杆之上又叠了一层汇率敞口。',
          '给自己做一次笨一点的压力测试就够：把分红打个折、把贷款利率往上挪一截，再看这张单还撑不撑得住。撑不住，就不该加这层杠杆。「别人一直这么做」不是证据，利率环境和保单条款都已经变了。',
        ] },
        { heading: '保单抵押与「借钱过日子」的边界', paragraphs: [
          'Buy, Borrow, Die 那套路径说的是：保单现金价值够厚时用它作抵押借钱维持现金流，身故赔偿再来结清本息。逻辑成立有三个前提同时站着——现金价值确实足够、贷款利率长期可控、赔偿金额覆盖未还本息还有余。高利率环境会把第二条压得很紧，而普通家庭往往并没有必须靠借款来维持现金流的需求。',
          '这类结构更适合资产量级大、有其他收入来源、且能承受追加保证金的人。把「高净值客户用过」直接搬成自家的配置方案，是最常见也最贵的一种照抄。',
        ] },
        { heading: '下面这几篇，按什么顺序读', paragraphs: [
          '收录的文章按两条线排：一条是币种——多元货币账户具体能做什么、跨币种对冲为什么不能靠预测汇率、美金保单在法律关系上能隔离什么，以及汇率红利那套算账方法；另一条是杠杆——香港保单融资怎么操作、Buy Borrow Die 的简化结构与不适合谁，以及美国 IUL 保费融资反照出的差别。先读币种再读杠杆，顺序反了容易把加杠杆当成多币种功能的自然延伸。',
        ] },
      ],
    },
    en: {
      lead: 'A Hong Kong policy that can hold US dollars, Hong Kong dollars and renminbi — and switch its base currency years later — is the defining structure of multi-currency savings insurance. What it sells is not "lots of currencies". It is the right to decide later. Premium financing is a separate matter: leverage placed on top of that option. The two arrive in the same illustration, but they have to be priced separately.',
      sections: [
        { heading: 'What "multi-currency" actually says in the contract', paragraphs: [
          'A policy is issued in a base currency, and the terms list the currencies it can be converted into, when conversion is allowed, how many times, at what rate and with what charge. Conversion is not a spot exchange of one currency for another. It re-bases the entire contract: the cash values, the bonus illustration and even the basis on which the death benefit is measured are recalculated. That is a different thing from simply changing money at a bank.',
          'The constraints hide in exactly those lines. There may be a waiting period; some policies only open a window at particular anniversaries; accumulated or locked bonuses may need to be dealt with first; the number of switches may be capped. "Convertible" and "freely convertible at any time, at no cost" are separated by a full set of terms. Reading that section once before signing is worth more than hearing "flexible allocation" ten times.',
        ] },
        { heading: 'Currency choice addresses long-term mismatch, not FX betting', paragraphs: [
          'The case for using it is concrete: the currency we earn in is not the currency we will eventually spend in. Where the children study, where retirement is likely to be spent, whether someone in the family has moved or is about to — these decide which currency the bills will arrive in decades from now. Keeping several convertible currencies inside the policy hedges the risk of reaching that day with only one kind of money in hand.',
          'Treating the feature as an FX trading tool is a wrong turn. Short-term exchange rates cannot be forecast, and conversion comes with windows and costs, so trying to earn the spread is both slow and expensive. The better reading is that it keeps a path open for an uncertain future, at the price of giving up some certainty. Diversification produces no extra return; what it buys is not being forced to decide at one particular moment.',
        ] },
        { heading: 'Premium financing stacks two sets of books', paragraphs: [
          'The structure is straightforward: we pay part of the premium, a bank lends the rest, the policy is pledged as collateral, and the expected policy return is meant to cover the loan interest, amplifying the sum assured. Leverage is added to the return side and a second set of books is added to the cost side. The trouble is that the two do not move together — the loan rate floats while the policy bonus is not guaranteed, one following the market and the other following the insurer\'s results and its illustrations.',
          'Three things need to be priced before signing. If rates rise, the spread inverts and an assumed positive return starts eating the principal. If cash value or collateral valuation falls short, a top-up call arrives, and the choice is either fresh cash or a forced disposal of the policy. If the loan currency does not match the policy currency, a second FX exposure sits on top of the leverage.',
          'One deliberately simple stress test is enough: haircut the bonus assumption, push the loan rate higher, and see whether the policy still holds. If it does not, the leverage does not belong there. "Other people have done this for years" is not evidence; both the rate environment and the contract terms have changed.',
        ] },
        { heading: 'Policy collateral and the limits of Buy, Borrow, Die', paragraphs: [
          'That strategy describes borrowing against a thick cash value to fund living costs, with the death benefit settling the outstanding principal and interest at the end. The logic stands on three premises at once: cash value genuinely deep enough, a loan rate that stays manageable over the long run, and a death benefit that covers the debt with something left over. A high-rate environment puts the second one under real pressure, and most ordinary households have no need to borrow against a policy to fund daily life.',
          'Structures like this suit large balance sheets with other income sources and the capacity to meet a margin call. Lifting "a high-net-worth client used this" straight into a family plan is one of the most common and most expensive kinds of copying.',
        ] },
        { heading: 'How to read the articles below', paragraphs: [
          'The collected articles run along two lines. The first is currency: what a multi-currency account actually does, why cross-currency hedging cannot rely on forecasting exchange rates, what a USD policy can and cannot isolate legally, and how the currency-dividend arithmetic works. The second is leverage: how premium financing is executed in Hong Kong, the simplified Buy, Borrow, Die structure and who it does not suit, and what US IUL premium financing reveals by contrast. Read currency before leverage; the other order makes leverage look like a natural extension of the currency feature.',
        ] },
      ],
    },
    es: {
      lead: 'Una póliza de Hong Kong que puede mantener dólares estadounidenses, dólares de Hong Kong y renminbi, y cambiar su divisa base años después, es la estructura que define al ahorro asegurado multidivisa. Lo que vende no es «muchas monedas», sino el derecho a decidir más adelante. La financiación de primas es otra cosa: apalancamiento colocado encima de esa opción. Las dos llegan en la misma ilustración, pero hay que calcularlas por separado.',
      sections: [
        { heading: 'Qué dice de verdad «multidivisa» en el contrato', paragraphs: [
          'La póliza se emite en una divisa base y las condiciones enumeran a qué divisas puede convertirse, cuándo se permite, cuántas veces, a qué tipo de cambio y con qué cargo. La conversión no es un cambio al contado de una moneda por otra: rebasa el contrato entero, de modo que se recalculan los valores en efectivo, la ilustración de bonificaciones e incluso la base con la que se mide el capital por fallecimiento. Eso no se parece a cambiar dinero en un banco.',
          'Las limitaciones se esconden justo en esas líneas. Puede haber un periodo de espera; algunas pólizas solo abren una ventana en aniversarios concretos; quizá haya que resolver antes las bonificaciones acumuladas o consolidadas; el número de conversiones puede estar acotado. Entre «convertible» y «convertible cuando se quiera, sin coste» media un bloque entero de condiciones. Leer ese apartado una vez antes de firmar vale más que escuchar diez veces «asignación flexible».',
        ] },
        { heading: 'Elegir divisa corrige un desajuste a largo plazo, no es apostar por el tipo de cambio', paragraphs: [
          'El caso de uso es concreto: la moneda en la que ingresamos no es la moneda en la que acabaremos gastando. Dónde estudian los hijos, dónde se prevé vivir la jubilación, si alguien de la familia ya se ha mudado o va a hacerlo: eso decide en qué divisa llegarán las facturas dentro de décadas. Mantener varias divisas convertibles dentro de la póliza cubre el riesgo de llegar a ese día con un solo tipo de dinero en la mano.',
          'Usar la función como herramienta de trading de divisas es un desvío. Los tipos a corto plazo no se pueden pronosticar, y la conversión tiene ventanas y costes, así que intentar capturar el diferencial es lento y caro. La lectura más sensata es que deja abierta una vía ante un futuro incierto, a cambio de renunciar a parte de la certidumbre. La diversificación no produce rentabilidad extra; lo que compra es no verse obligado a decidir en un momento concreto.',
        ] },
        { heading: 'La financiación de primas superpone dos contabilidades', paragraphs: [
          'La estructura es sencilla: aportamos una parte de la prima, un banco presta el resto, la póliza queda pignorada como garantía y la rentabilidad esperada debe cubrir los intereses del préstamo, amplificando el capital asegurado. Al lado del rendimiento se añade apalancamiento y, al lado de los costes, una segunda contabilidad. El problema es que ambas no se mueven juntas: el tipo del préstamo es variable y la bonificación de la póliza no está garantizada; uno sigue al mercado y la otra, a los resultados de la aseguradora y a sus ilustraciones.',
          'Hay tres cosas que calcular antes de firmar. Si suben los tipos, el diferencial se invierte y la rentabilidad prevista empieza a comerse el capital aportado. Si el valor en efectivo o la valoración de la garantía quedan por debajo, llega un requerimiento de cobertura y la alternativa es aportar más dinero o deshacer la póliza. Si la divisa del préstamo no coincide con la de la póliza, se añade una segunda exposición cambiaria encima del apalancamiento.',
          'Basta una prueba de estrés deliberadamente simple: recortar la hipótesis de bonificaciones, subir el tipo del préstamo y comprobar si la póliza sigue aguantando. Si no aguanta, ese apalancamiento no corresponde. «Otros lo han hecho durante años» no es una prueba; han cambiado tanto el entorno de tipos como las condiciones del contrato.',
        ] },
        { heading: 'La prenda de la póliza y los límites del Buy, Borrow, Die', paragraphs: [
          'Esa estrategia describe pedir prestado contra un valor en efectivo abultado para sostener el gasto corriente, con el capital por fallecimiento liquidando al final el principal y los intereses pendientes. La lógica se apoya en tres premisas simultáneas: un valor en efectivo realmente suficiente, un tipo de préstamo sostenible a largo plazo y un capital por fallecimiento que cubra la deuda con margen. Un entorno de tipos altos presiona con fuerza la segunda, y la mayoría de las familias corrientes no necesita endeudarse contra una póliza para vivir el día a día.',
          'Estructuras así encajan con patrimonios grandes, otras fuentes de ingresos y capacidad para atender requerimientos de garantías. Trasladar «un cliente de alto patrimonio lo usó» directamente al plan familiar es una de las copias más habituales y más caras.',
        ] },
        { heading: 'Cómo leer los artículos de abajo', paragraphs: [
          'Los artículos reunidos siguen dos líneas. La primera es la divisa: qué hace realmente una cuenta multidivisa, por qué la cobertura entre monedas no puede apoyarse en pronosticar el tipo de cambio, qué puede y qué no puede aislar jurídicamente una póliza en dólares, y cómo se calcula la llamada renta por diferencia de divisas. La segunda es el apalancamiento: cómo se ejecuta la financiación de primas en Hong Kong, la estructura simplificada del Buy, Borrow, Die y a quién no conviene, y lo que revela por contraste la financiación de primas del IUL estadounidense. Primero la divisa y después el apalancamiento; al revés, el apalancamiento parece una extensión natural de la función multidivisa.',
        ] },
      ],
    },
    ar: {
      lead: 'وثيقة تأمين في هونغ كونغ تحتفظ بالدولار الأمريكي ودولار هونغ كونغ واليوان، ويمكنها بعد سنوات أن تبدّل عملة الأساس، هي البنية التي يقوم عليها ادخار التأمين متعدد العملات. وما تبيعه ليس «عملات كثيرة»، بل حق أن نقرر لاحقاً. أما تمويل الأقساط فشأن آخر: رافعة تُوضع فوق ذلك الخيار. يصل الاثنان في جدول إيضاحات واحد، لكن حساب كل منهما يجب أن ينفصل.',
      sections: [
        { heading: 'ماذا تقول «متعددة العملات» فعلاً في العقد', paragraphs: [
          'تُصدر الوثيقة بعملة أساس، وتذكر الشروط العملات القابلة للتحويل إليها، ومتى يُسمح بالتحويل، وكم مرة، وبأي سعر، ومقابل أي رسم. والتحويل ليس مبادلة فورية لعملة بأخرى، بل إعادة تعيين لأساس العقد كله: تُعاد حساب القيم النقدية وإيضاحات الأرباح، بل والأساس الذي يُقاس به تعويض الوفاة. وهذا غير تبديل النقود في البنك.',
          'وفي تلك السطور بالذات تختبئ القيود: قد تكون هناك فترة انتظار، وبعض الوثائق لا تفتح إلا نافذة في ذكرى سنوية محددة، وقد يلزم معالجة الأرباح المتراكمة أو المثبّتة أولاً، وقد يكون عدد مرات التحويل محدوداً. وبين «قابلة للتحويل» و«قابلة للتحويل في أي وقت وبلا كلفة» تقف مجموعة كاملة من الشروط. وقراءة هذا القسم مرة واحدة قبل التوقيع أنفع من سماع «مرونة في التوزيع» عشر مرات.',
        ] },
        { heading: 'اختيار العملة يعالج عدم توافق طويل الأجل، لا المراهنة على الصرف', paragraphs: [
          'الحالة التي يُستخدم فيها هذا الخيار محددة: العملة التي نكسب بها ليست العملة التي سننفق بها في النهاية. أين يدرس الأبناء، وأين يُتوقع قضاء التقاعد، وهل انتقل أحد في الأسرة أو يوشك على الانتقال: هذه هي التي تحدد العملة التي ستصل بها الفواتير بعد عقود. وإبقاء عدة عملات قابلة للتحويل داخل الوثيقة يحوط خطر أن نصل إلى ذلك اليوم وليس في يدنا إلا نوع واحد من النقود.',
          'أما التعامل مع الميزة كأداة متاجرة في العملات فهو انحراف عن الغرض: أسعار الصرف القصيرة لا تُتنبّأ، وللتحويل نوافذ وتكاليف، فمحاولة اقتناص الفارق بطيئة ومكلفة. والقراءة الأقرب أنها تُبقي طريقاً مفتوحاً لمستقبل غير مؤكد، مقابل التخلي عن جزء من اليقين. والتنويع لا يولّد عائداً إضافياً؛ ما يشتريه هو ألا نُجبر على القرار في لحظة واحدة بعينها.',
        ] },
        { heading: 'تمويل الأقساط يضع دفترين أحدهما فوق الآخر', paragraphs: [
          'البنية بسيطة: ندفع جزءاً من القسط، ويُقرض البنك الباقي، وتُرهن الوثيقة ضماناً، ويُفترض أن يغطي العائد المتوقع للوثيقة فائدة القرض، فيتضخم مبلغ التأمين. تُضاف رافعة إلى جانب العائد، ويُضاف دفتر ثانٍ إلى جانب الكلفة. والمشكلة أن الاثنين لا يتحركان معاً: فائدة القرض متغيّرة وأرباح الوثيقة غير مضمونة، أحدهما يتبع السوق والآخر يتبع نتائج الشركة وإيضاحاتها.',
          'وثلاثة أمور يجب حسابها قبل التوقيع. إن ارتفعت الفائدة انقلب الفارق، وبدأ العائد المتوقع يأكل رأس المال المدفوع. وإن هبطت القيمة النقدية أو تقييم الضمان جاء طلب تغطية إضافية، فإما سيولة جديدة وإما تصفية الوثيقة اضطراراً. وإن اختلفت عملة القرض عن عملة الوثيقة، أُضيف تعرّض صرفي ثانٍ فوق الرافعة.',
          'وتكفي اختبارات ضغط بسيطة عن قصد: نخفض افتراض الأرباح، ونرفع فائدة القرض، ثم ننظر هل تصمد الوثيقة. فإن لم تصمد، فالرافعة لا مكان لها. وقول «آخرون يفعلون هذا منذ سنوات» ليس دليلاً؛ فكلٌّ من بيئة الفائدة وشروط العقد قد تغيّر.',
        ] },
        { heading: 'رهن الوثيقة وحدود Buy, Borrow, Die', paragraphs: [
          'تصف تلك الاستراتيجية الاقتراض بضمان قيمة نقدية سميكة لتغطية نفقات المعيشة، على أن يُسدّد تعويض الوفاة في النهاية أصل الدين وفوائده. ويقوم المنطق على ثلاث مقدمات معاً: قيمة نقدية عميقة بما يكفي، وفائدة قرض قابلة للاحتمال طويلاً، وتعويض وفاة يغطي الدين ويُبقي فائضاً. وبيئة الفائدة المرتفعة تضغط بقوة على المقدمة الثانية، ومعظم الأسر العادية لا تحتاج أصلاً إلى الاقتراض بضمان وثيقة لتغطية حياتها اليومية.',
          'وهذه البنيات تناسب ميزانيات كبيرة ذات مصادر دخل أخرى وقدرة على تلبية طلبات التغطية الإضافية. أما نقل «عميل ثري استخدم هذا» مباشرة إلى خطة الأسرة فهو من أكثر أنواع النسخ شيوعاً وأغلاها ثمناً.',
        ] },
        { heading: 'كيف تقرأ المقالات أدناه', paragraphs: [
          'تسير المقالات المجموعة على خطين. الأول للعملة: ماذا يفعل الحساب متعدد العملات فعلاً، ولماذا لا يمكن للتحوط بين العملات أن يقوم على توقّع أسعار الصرف، وما الذي تعزله وثيقة الدولار قانوناً وما لا تعزله، وكيف تُحسب ما تسمى أرباح فروق العملات. والثاني للرافعة: كيف يُنفَّذ تمويل الأقساط في هونغ كونغ، والبنية المبسّطة لـ Buy, Borrow, Die ولمن لا تناسب، وما يكشفه تمويل أقساط IUL الأمريكي بالمقارنة. اقرأ العملة قبل الرافعة؛ فالعكس يجعل الرافعة تبدو امتداداً طبيعياً لميزة تعدّد العملات.',
        ] },
      ],
    },
  },
};
