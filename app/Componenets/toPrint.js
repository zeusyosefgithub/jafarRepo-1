import React from "react";
import logo from '../../images/logo.png';
import Image from 'next/image';
import rep2 from '../../images/rep2.jpg';
import rep1 from '../../images/rep1.jpg';
import rep3 from '../../images/rep3.png';
import rep4 from '../../images/rep4.jpeg';
import rep5 from '../../images/rep5.jpeg';
import rep6 from '../../images/rep6.png';
import rep7 from '../../images/rep7.png';
import rep8 from '../../images/rep8.png';
import { FaPhone } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaTruckFront } from "react-icons/fa6";




export const ComponentToPrint = React.forwardRef((props, ref) => {
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });
    let currentdate = `${day}/${month}/${year}`;


    return (
        props.languge ?
            <div dir="rtl" ref={ref} className="relative">
                <Image
                    className="backImage"
                    src={rep4}
                />
                <div className="p-6 relative">

                    <div className=" border-b-2 border-[#a1a1aa] mb-2 pb-2">
                        <table className="w-full text-center">
                            <tbody>
                                <tr>
                                    <td><Image
                                        src={rep2}
                                        width={60}
                                    /></td>
                                    <td><p>געפר כבהא - תעשיות  </p>
                                        <p>مصنع الخرسانة الجاهزة</p></td>
                                    <td><Image
                                        className="rounded-lg"
                                        src={rep6}
                                        width={70}
                                    /></td>
                                    <td><p>المركز الرئيسي برطعة :</p>
                                        <p className="smtextin">رقم المكتب : 0542253326</p>
                                        <p className="smtextin">رقم الهاتف : 0549137616</p></td>
                                    <td><Image
                                        src={rep3}
                                        width={50}
                                    /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="flex w-full justify-between text-xs border-b-2 border-[#a1a1aa] mb-3">
                    <div>
                        <Image
                            src={rep2}
                            width={70}
                        />

                    </div>
                    <div>
                        <p>געפר כבהא - תעשיות בטון מוכן</p>
                        <p>מפעלי בטון מוכן</p>
                    </div>
                    <div className="">
                        <Image
                            className="rounded-lg"
                            src={rep4}
                            width={60}
                        />
                    </div>
                    <div>
                        <p>משרד רשי ברטעה : </p>
                        <p>מפעלי בטון מוכן</p>


                    </div>
                    <div className="mb-1">
                        <Image
                            src={rep3}
                            width={60}
                        />

                    </div>
                </div> */}

                    <div className="flex w-full justify-between text-sm invoic_propr mb-2">
                        <div>
                            <p>لحضرة : </p>
                        </div>
                        <div>
                            <p>رقم شهادة التسليم :</p>
                        </div>

                        <div>
                            <p>التاريخ : {currentdate}</p>
                        </div>
                    </div>

                    <div className="flex w-full justify-between smtextin">
                        <div className="invoic_propr">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>الزبون : </td>
                                        <td>{props.inewInv.invoices_customer_name}</td>
                                    </tr>
                                    <tr>
                                        <td>العنوان : </td>
                                        <td>{props.inewInv.invoices_customer_city}</td>
                                    </tr>
                                    <tr>
                                        <td>شارع : </td>
                                        <td>{props.inewInv.invoices_customer_street}</td>
                                    </tr>
                                    <tr>
                                        <td>رقم الهاتف : </td>
                                        <td>{props.inewInv.invoices_customer_id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="invoic_propr">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>مضخة : </td>
                                        <td>{props.inewInv.invoices_pump}</td>
                                    </tr>
                                    <tr>
                                        <td>خلاط : </td>
                                        <td>{props.inewInv.invoices_truck}</td>
                                    </tr>
                                    <tr>
                                        <td>سائق : </td>
                                        <td>{props.inewInv.invoices_driver}</td>
                                    </tr>
                                    <tr>
                                        <td>إمضاء السائق : </td>
                                        <td>__________________________</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <table className="invoic_table">
                                <tbody>
                                    <tr>
                                        <th>غادر في</th>
                                        <th>{time}</th>
                                    </tr>
                                    <tr>
                                        <td>وقت الوصول</td>
                                        <td>__________</td>
                                    </tr>
                                    <tr>
                                        <td>نهاية التفريغ في</td>
                                        <td>__________</td>
                                    </tr>
                                    <tr>
                                        <td>الاستعداد</td>
                                        <td>__________</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex w-full justify-center">
                        <div>
                            <table className="invoic_table_Prop1 mt-1">
                                <tbody>
                                    <tr>
                                        <td><p className="text-center">كان مدعوا</p></td>
                                        <td><p>رقم المورد</p></td>
                                        <td><p>نوع الخرسانة</p></td>
                                        <td><p>نوع من الخرسانة</p></td>
                                        <td><p>مستوى الثقة</p></td>
                                        <td><p>درجة التعرض</p></td>
                                    </tr>
                                    <tr>
                                        <td>{props.inewInv.invoices_quantity}</td>
                                        <td>{props.inewInv.invoices_kind_supplier_number}</td>
                                        <td>{props.inewInv.invoices_kind_material}</td>
                                        <td>{props.inewInv.invoices_kind_type_of_concrete}</td>
                                        <td>{props.inewInv.invoices_concretd_grade}</td>
                                        <td>{props.inewInv.invoices_kind_egree_of_Exposure}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex w-full justify-end">
                        <div className="text-xs">
                            <p>أضف______________ بالكمية __________التوقيع____________</p>
                        </div>
                    </div>

                    <div className="flex w-full justify-between">

                        <div className="smalling_text">
                            <p>لاهتمام العميل : </p>
                            <p>1. الخرسانة مطابقة للمواصفة القياسية رقم 118.</p>
                            <p>2. تكون مسئولية الشركة عن كمية الخرسانة وقوتها ومتانتها حتى خروجها من الخلاط وذلك فقط عندما:-</p>
                            <p>أ. تم إجراء جميع الاختبارات وفقًا للمعايير المذكورة أعلاه من قبل ممثل معتمد من:</p>
                            <p>ب. إن توقيع المختبر المعتمد هو تأكيد على أنه تم أخذ العينة للاختبار ولهذا فقط.</p>
                            <p>ث. تم أخذ العينات من حوض أرابيل خلال 90 يومًا من مغادرة الشاحنة للمصنع أو خلال 60 يومًا من وصولها إلى الموقع، أيهما يأتي أولاً.</p>
                            <p>ج. لم تتم إضافة أي ماء أو أي مادة أخرى إلى الخرسانة بناء على طلب المستلم أو من قبله.</p>
                        </div>
                        <div className="">
                            <p className="ivoic_p"> درجة التعرض _______</p>
                        </div>
                        <div className="text-xs">
                            <table className="invoic_table">
                                <tbody>
                                    <tr>
                                        <th colSpan={3}><p>معمل الاختبار</p></th>

                                    </tr>
                                    <tr>
                                        <td><p>معمل</p></td>
                                        <td><p>الساعة</p></td>
                                        <td><p>المختبر</p></td>
                                    </tr>
                                    <tr>
                                        <td><br /><br /></td>
                                        <td><br /><br /></td>
                                        <td><br /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="flex w-full justify-between">
                        <div className="smalling_text">
                            <p>هـ - الاختبار الموثوق – وفق اختبار حميدة فقط. فحص الكمية عن طريق وزن الخلطات وتحديدها مكانيا فقط التحقق من القوة بناء على نتائج المكعبات بعمر 28 يوما على الأقل.</p>
                            <p>و. سيتم تقديم كل بيت بناءً على ثقتك أو الكمية كتابيًا إلى الشركة مع مستندات الهيئة المعتمدة في غضون يومي عمل من وقت الإنتاج وبالنسبة للتناقض في القوة في غضون 10 أيام عمل مع شهادة</p>
                            <p>مؤقتا وخلال 42 يوما مع الشهادة النهائية.</p>
                            <p>3. يكون العميل مسؤولاً عن إعداد طرق الوصول وأماكن التفريغ المناسبة في الموقع، وإلا فإنه سيكون مسؤولاً عن أي أضرار و/أو نفقات يسببها هو أو أي شخص ينوب عنه.</p>
                            <p>4. يحق للشركة إجراء عمليات فحص متكررة لعنصر الصب ويجب على العميل السماح والمساعدة في ذلك. وفي حالة عدم سماح العميل بتكرار الاختبارات، فسيتم إعفاء الشركة من أي مسؤولية.</p>
                            <p>سيكون توقيع المستلم دليلاً على استلام الشحنة وفقاً للطلبات وحسب التفاصيل والأوقات والشروط أعلاه وهذا دون الخروج عن أحكام أي اتفاقية موقعة مع الشركة في حال توقيعها.</p>
                        </div>
                    </div>

                    <div className="smalling_text_1 flex w-full justify-between text-xs mt-1 invoic_propr items-center">
                        <div>
                            <p> ملاحظات السائق ________________________________________________</p>
                        </div>

                        <div className="border-2 border-black">
                            <p>أنا الوكيل المعتمد لاستلام الشحنة</p>
                            <p className="text-center">ويؤكد استلامه كما هو مفصل أعلاه</p>
                        </div>

                        <div>
                            <p> تعليقات العملاء ________________________________________________</p>
                        </div>
                    </div>
                    <div className="smalling_text_1 flex w-full justify-between text-xs invoic_propr">
                        <div>
                            <p> اسم المتلقي ______________________________________</p>
                        </div>

                        <div>
                            <p> توقيع المستلم ______________________________________</p>
                        </div>

                        <div>
                            <p>وظيفة ______________________________________</p>
                        </div>
                    </div>
                    <div className="smalling_text_1 flex w-full justify-between text-xs ">
                        <div>
                            <p>تخضع هذه الشهادة لشروط التوريد الخاصة بالشركة كما هو محدد في عرض توريد الخرسانة الجاهزة. تشكل الشهادة سند شحن وتكون مسؤولية المستلم وفقًا للاتفاق بين المستلم والشركة.</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div dir="rtl" ref={ref} className="relative">
                <Image
                    className="backImage"
                    src={rep6}
                />
                <Image
                    className="backImage1"
                    src={rep6}
                    width={110}
                />
                <div className="pr-3 pl-3 pb-3 relative">

                    <div className=" border-b-2 border-[#a1a1aa]">
                        <table className="w-full text-center">
                            <tbody>
                                <tr>
                                    <td className=""><Image
                                        src={rep2}
                                        width={60}
                                        className=""
                                    /></td>
                                    <td className="text-start"><p className="smtextin_titel"> תעשיות בטון, וחומרי בניין אבו געפר בע"מ</p>
                                        <p className="smtextin">מפעל בטון וטיט עם משאבות, וחומרי בניין</p></td>
                                    <td className="titels_Inv"><p className="smtextin_titel flex justify-start">משרד ראשי ברטעה</p>
                                        <p className="smtextin items-center flex justify-start"><FaPhone className="ml-2 text-base" /><p>טלפון : 0549137616</p></p>
                                        <p className="smtextin items-center flex justify-start"><FaPhone className="ml-2 text-base" /><p>טלפון המשרד : 054-2253326</p></p></td>
                                    <td className="flex justify-end"><Image
                                        src={rep3}
                                        width={55}
                                        className="bg-green-500"
                                    /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="flex justify-between mt-2">

                        <div className="flex">
                            <div className="invoic_propr">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="pb-3 text-base flex items-center"> הזמנה מספר : {props.inewInv.invoices_id}</td>
                                        </tr>
                                        <tr >
                                            <td className="p-1 text-sm flex items-center"> <FaUser className="ml-1"/> לקוח : {props.inewInv.invoices_customer_name}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 text-sm flex items-center"> <FaHouseChimney className="ml-1"/> כתובת : {props.inewInv.invoices_customer_city}</td>
                                        </tr>
                                        <tr> 
                                            <td className="p-1 text-sm flex items-center"> <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" height="16" width="15" viewBox="0 0 576 512"><path d="M256 32H181.2c-27.1 0-51.3 17.1-60.3 42.6L3.1 407.2C1.1 413 0 419.2 0 425.4C0 455.5 24.5 480 54.6 480H256V416c0-17.7 14.3-32 32-32s32 14.3 32 32v64H521.4c30.2 0 54.6-24.5 54.6-54.6c0-6.2-1.1-12.4-3.1-18.2L455.1 74.6C446 49.1 421.9 32 394.8 32H320V96c0 17.7-14.3 32-32 32s-32-14.3-32-32V32zm64 192v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg> רחוב : {props.inewInv.invoices_customer_street}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 text-sm flex items-center"> <FaPhone className="ml-1"/> טלפון : {props.inewInv.invoices_customer_id}</td>
                                        </tr>                           
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-2 mr-3 ml-3 m-auto h-1/2 border-[#a1a1aa]"></div>
                            <div className="invoic_propr">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="pb-3 text-base flex items-center"> תאריך : {currentdate}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 text-sm flex items-center"> <FaTruckFront className="ml-1"/> משאבה : {props.inewInv.invoices_pump}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 text-sm flex items-center"> <FaTruckFront className="ml-1"/> מערבל : {props.inewInv.invoices_truck}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 text-sm flex items-center"> <FaUser className="ml-1"/> נהג : {props.inewInv.invoices_driver}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="w-1/2">
                            <div>
                                <table className="invoic_table_Prop1 w-full">
                                    <tbody>
                                        <tr>
                                            {/* <td><p className="text-center">הוזמן</p></td>
                                    <td><p>מ"ק סופק</p></td> */}
                                            <td><p>מספר מערבל</p></td>
                                            <td><p>סה"כ הוזמן</p></td>
                                            <td><p>סופק</p></td>
                                            <td><p>משלוח זה</p></td>
                                        </tr>
                                        <tr>
                                            {/* <td>{props.inewInv.invoices_quantity}</td>
                                    <td>{props.inewInv.invoices_kind_supplier_number}</td> */}
                                            <td>{props.inewInv.invoices_kind_material}</td>
                                            <td>{props.inewInv.invoices_quantity}</td>
                                            <td>{props.inewInv.invoices_taked}</td>
                                            <td>{props.inewInv.invoices_stil > 7 ? 8 : props.inewInv.invoices_stil}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className="invoic_table_Prop1 mt-3 w-full">
                                    <tbody>
                                        <tr>
                                            {/* <td><p className="text-center">הוזמן</p></td>
                                    <td><p>מ"ק סופק</p></td> */}
                                            <td><p>סוג בטון</p></td>
                                            <td><p>מין בטון</p></td>
                                            <td><p>דרגת סומך</p></td>
                                            <td><p>דרגת חשיפה</p></td>
                                        </tr>
                                        <tr>
                                            {/* <td>{props.inewInv.invoices_quantity}</td>
                                    <td>{props.inewInv.invoices_kind_supplier_number}</td> */}
                                            <td>{props.inewInv.invoices_kind_material}</td>
                                            <td>{props.inewInv.invoices_kind_type_of_concrete}</td>
                                            <td>{props.inewInv.invoices_concretd_grade}</td>
                                            <td>{props.inewInv.invoices_kind_egree_of_Exposure}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-end">
                            <div className="smalling_text top-0">
                                <p>לתשומת לב הלקוח:</p>
                                <p>1. הבטון מתאים לתקן מס' 118.</p>
                                <p>2. אחריות החברה לכמות,חוזק וסומך הבטון הוא עד ליציאתו מפתח הערבל ורק כאשר :- </p>
                                <p>א. כל הבדיקות בוצעו לפי התקן הנ"ל ע"יי נציג מוסמך של מוסמכת:</p>
                                <p>ב. חתימת המעבדה המוסמכת מהווה אישור כי ניטלה דוגמא לבדיקה ולכך בלבד.</p>
                                <p>ג. הדגימות נלקחו משוקת הערבל תוך 90 ד' מיציאת המשאית מהמפעל או תוך 60 ד' מהגעתה לאתר לפי המוקדם.</p>
                                <p>ד. לבטון לא נוספו מים או חומר אחר לפי דרישת המקבל או על ידו.</p>
                            </div>
                        </div>

                        <div className="smtextin mt-3">
                            <table className="invoic_table">
                                <tbody>
                                    <tr>
                                        <th>יצאה בשעה</th>
                                        <th>{time}</th>
                                    </tr>
                                    <tr>
                                        <td>שעת הגעה</td>
                                        <td>__________</td>
                                    </tr>
                                    <tr>
                                        <td>סיום פריקה בשעה</td>
                                        <td>__________</td>
                                    </tr>
                                    <tr>
                                        <td>המתנה</td>
                                        <td>__________</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-between">

                        <div className="smalling_text">
                            <p>ה.בדיקה הסומך - לפי מבחן החמיטה בלבד. בדיקת הכמות ע"י שקילת ערבלים וקביעת מרחבי בלבד בדיקת החוזק על סמך תוצאות.</p>
                            <p>קוביות בגיל 28 יום לפחות בלבד</p>
                            <p>ו. כל מלונה על סומך או כמות תומצא בכתב לחברה יחד עם מסמכי הגוף המוסמך תוך 2 ימי עבודה מעת ההפקה ועל אי ההתאמה לחוזק</p>
                            <p>תוך 10 עבודה בצירוף תעוד זמנית ותוך 42 יום בצירוף תעודה סופית.</p>
                            <p>3.הלקוח אחראי להכנת דרכי גישה ומקומות פריקה מתאימים באתר, אחרת יהיה אחראי לכל נזק ו/או הוצאה שיגרמו או מי מטעמה.</p>
                            <p>4.החברה זכאית ליזום בדיקות חוזרות באלמנט היצוקה ועל הלקוח לאפשר ולסייע לכך. לא איפשר הלקוח הבדיקות החוזרות תהא החברה פטורה מכל אחריות.</p>
                            <p>חתימת המקבל תהווה הוכחה לקבלת המשלוח בהתאם להזמנות ולפי הפירוט, הזמנים והתנאים לעיל וזאת מבלי לגרוע מהוראות כל הסכם חתום עם החברה.אם נחתם.</p>

                        </div>

                        <div className="flex items-center">
                            <div>
                                <table className="invoic_table1">
                                    <tbody>
                                        <tr>
                                            <th colSpan={3}><p>המעבדה הבודקת</p></th>
                                        </tr>
                                        <tr>
                                            <td><p>מעבדה</p></td>
                                            <td><p>שעה</p></td>
                                            <td><p>הבודק</p></td>
                                        </tr>
                                        <tr>
                                            <td><br /><br /></td>
                                            <td><br /><br /></td>
                                            <td><br /><br /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="smalling_text_1 flex w-full justify-between mt-1 invoic_propr items-center">
                            <div>
                                <p>הערות הנהג ____________________________________________________________________</p>
                            </div>

                            <div className="border-2 border-black">
                                <p>אני הח"מ מוסמך לקבל המשלוח</p>
                                <p className="text-center">ומאשר קבלתו כמפורט לעיל</p>
                            </div>

                            <div>
                                <p>הערות הלקוח ____________________________________________________________________</p>
                            </div>
                        </div>
                        <div className="smalling_text_1 flex w-full justify-between invoic_propr">
                            <div>
                                <p>שם המקבל ________________________________________________________</p>
                            </div>

                            <div>
                                <p>חתימת המקבל ________________________________________________________</p>
                            </div>

                            <div>
                                <p>תפקיד ________________________________________________________</p>
                            </div>
                        </div>
                        <div className="smalling_text_1 flex w-full justify-between">
                            <div>
                                <p>תעודה זו כפופה לתנאי האספקה של החברה כמפורט בהצעה לאספקת בטון מונא. התעודה מהווה שטר מטען ואחריות המקבל היא בהתאם לתתה בין המקבל לבין החברה.</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
});