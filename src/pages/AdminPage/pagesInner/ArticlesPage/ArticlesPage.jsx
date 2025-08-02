import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ArticlesPage.module.scss";

import { useState } from "react";
import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";
import { useForm } from "react-hook-form";
import warning from "../../../../assets/imgs/vector/warning.svg";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "Как стать успешным методистом",
            description: "Краткое описание статьи о карьерных возможностях...",
            image: "../../src/assets/imgs/raster/post.jpg",
            status: "опубликовано",
            author: "Анна Петрова",
        },
        {
            id: 2,
            title: "Новые методики преподавания",
            description: "Современные подходы к обучению в 2025 году...",
            image: "../../src/assets/imgs/raster/post.jpg",
            status: "черновик",
            author: "Иван Сидоров",
        },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        reset: resetAdd,
        formState: { errors: errorsAdd },
    } = useForm();

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: errorsEdit },
    } = useForm();

    const handleAdd = (data) => {
        const newArticle = {
            id: Date.now(),
            ...data,
        };
        setArticles([newArticle, ...articles]);
        resetAdd();
        setIsAddModalOpen(false);
    };

    const handleEdit = (data) => {
        setArticles(
            articles.map((a) => (a.id === selectedArticle.id ? { ...a, ...data } : a))
        );
        resetEdit();
        setIsEditModalOpen(false);
    };

    const handleDelete = () => {
        setArticles(articles.filter((a) => a.id !== selectedArticle.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className={s.ArticlesPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <section className={s.section__articles}>
                            <h5>Управление статьями</h5>

                            <button className={s.addButton} onClick={() => setIsAddModalOpen(true)}>
                                Добавить статью
                            </button>

                            <div className={s.articlesList}>
                                {articles.length === 0 ? (
                                    <p className={s.empty}>Статьи не найдены</p>
                                ) : (
                                    articles.map((article) => (
                                        <div key={article.id} className={s.articleCard}>
                                            <div className={s.imageWrapper}>
                                                <img src={article.image} alt={article.title} />
                                            </div>

                                            <div className={s.content}>
                                                <h6>{article.title}</h6>
                                                <p className={s.description}>{article.description}</p>
                                                <div className={s.meta}>
                                                    <span className={s.author}>Автор: {article.author}</span>
                                                    <span
                                                        className={`${s.status} ${article.status === "опубликовано"
                                                                ? s.published
                                                                : s.draft
                                                            }`}
                                                    >
                                                        {article.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={s.actions}>
                                                <button
                                                    className={s.btnEdit}
                                                    onClick={() => {
                                                        setSelectedArticle(article);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    className={s.btnDelete}
                                                    onClick={() => {
                                                        setSelectedArticle(article);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            <UniversalModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    resetAdd();
                }}
                onApply={handleSubmitAdd(handleAdd)}
                content={
                    <section className={modal_s.common}>
                        <h5>Добавить статью</h5>
                        <div className={modal_s.items}>
                            <div className={modal_s.item}>
                                <p>Заголовок</p>
                                <input
                                    type="text"
                                    {...registerAdd("title", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsAdd.title && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsAdd.title.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Описание</p>
                                <textarea
                                    className={s.modal__textarea}
                                    {...registerAdd("description", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsAdd.description && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsAdd.description.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Ссылка на изображение</p>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    {...registerAdd("image", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsAdd.image && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsAdd.image.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Автор</p>
                                <input
                                    type="text"
                                    {...registerAdd("author", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsAdd.author && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsAdd.author.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Статус</p>
                                <select {...registerAdd("status", { required: "Обязательно" })}>
                                    <option value="">Выберите статус</option>
                                    <option value="опубликовано">Опубликовано</option>
                                    <option value="черновик">Черновик</option>
                                </select>
                                {errorsAdd.status && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsAdd.status.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                }
            />
            <UniversalModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    resetEdit();
                }}
                onApply={handleSubmitEdit(handleEdit)}
                content={
                    <section className={modal_s.common}>
                        <h5>Редактировать статью</h5>
                        <div className={modal_s.items}>
                            <div className={modal_s.item}>
                                <p>Заголовок</p>
                                <input
                                    type="text"
                                    defaultValue={selectedArticle?.title}
                                    {...registerEdit("title", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsEdit.title && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsEdit.title.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Описание</p>
                                <textarea
                                    className={s.modal__textarea}
                                    defaultValue={selectedArticle?.description}
                                    {...registerEdit("description", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsEdit.description && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsEdit.description.message}</p>
                                    </div>
                                )}
                            </div>

                            <div className={modal_s.item}>
                                <p>Ссылка на изображение</p>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    defaultValue={selectedArticle?.image}
                                    {...registerEdit("image", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsEdit.image && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsEdit.image.message}</p>
                                    </div>
                                )}
                            </div>

                            <div className={modal_s.item}>
                                <p>Автор</p>
                                <input
                                    type="text"
                                    defaultValue={selectedArticle?.author}
                                    {...registerEdit("author", {
                                        required: "Обязательное поле",
                                    })}
                                />
                                {errorsEdit.author && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsEdit.author.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className={modal_s.item}>
                                <p>Статус</p>
                                <select
                                    defaultValue={selectedArticle?.status}
                                    {...registerEdit("status", { required: "Обязательно" })}
                                >
                                    <option value="">Выберите статус</option>
                                    <option value="опубликовано">Опубликовано</option>
                                    <option value="черновик">Черновик</option>
                                </select>
                                {errorsEdit.status && (
                                    <div className={s.inlineError}>
                                        <img src={warning} alt="Ошибка" />
                                        <p>{errorsEdit.status.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                }
            />
            <UniversalModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onApply={handleDelete}
                content={
                    <section className={modal_s.common}>
                        <h6>Подтвердите удаление</h6>
                        <p>
                            Вы действительно хотите удалить статью <strong>"{selectedArticle?.title}"</strong>?
                        </p>
                        <p style={{ color: "#E74C3C", marginTop: "10px" }}>
                            Это действие нельзя отменить.
                        </p>
                    </section>
                }
            />
        </div>
    );
} 
