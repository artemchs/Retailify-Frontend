import ComboboxSubItemForArrayValues from '@/components/filters/ComboboxSubItemForArrayValues'
import DropdownFilter from '@/components/filters/DropdownFilter'
import IsArchivedSwitch from '@/components/filters/IsArchivedSwitch'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import SelectBrandsForFiltering from '@/features/brands/components/shared/SelectBrandsForFiltering'
import SelectCategoriesForFiltering from '@/features/categories/components/shared/SelectCategoriesForFiltering'
import SelectCharacteristicValuesForFiltering from '@/features/characteristics/values/components/shared/SelectCharacteristicValuesForFiltering'
import SelectColorsForFiltering from '@/features/colors/components/shared/SelectColorsForFiltering'
import SelectProductTagsForFiltering from '@/features/product-tags/components/shared/SelectProductTagsForFiltering'
import { productsRoute } from '@/lib/router/routeTree'
import { useNavigate, useSearch } from '@tanstack/react-router'

export default function FilterProducts() {
    const {
        isArchived,
        brandIds,
        categoryIds,
        characteristicValueIds,
        colorIds,
        productGenders,
        productSeasons,
        tagIds,
    } = useSearch({
        from: productsRoute.id,
    })
    const navigate = useNavigate()

    function numOfApplied() {
        let number = 0

        if (isArchived) {
            number += 1
        }

        for (const arr of [
            brandIds,
            categoryIds,
            characteristicValueIds,
            colorIds,
            productGenders,
            productSeasons,
            tagIds,
        ]) {
            if (arr && arr.length >= 1) {
                number += 1
            }
        }

        return number
    }

    function setIsArchived(value: number) {
        navigate({
            search: (prev) => ({ ...prev, isArchived: value }),
        })
    }

    function setTagIds(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, tagIds: values }),
        })
    }

    function setBrandIds(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, brandIds: values }),
        })
    }

    function setCategoryIds(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, categoryIds: values }),
        })
    }

    function setCharacteristicValueIds(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, characteristicValueIds: values }),
        })
    }

    function setColorIds(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, colorIds: values }),
        })
    }

    function setGenders(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, productGenders: values }),
        })
    }

    function setSeasons(values?: string[]) {
        navigate({
            search: (prev) => ({ ...prev, productSeasons: values }),
        })
    }

    function resetFilters() {
        navigate({
            search: (prev) => ({
                ...prev,
                isArchived: 0,
                tagIds: undefined,
                brandIds: undefined,
                categoryIds: undefined,
                characteristicValueIds: undefined,
                colorIds: undefined,
                productGenders: undefined,
                productSeasons: undefined,
            }),
        })
    }

    return (
        <DropdownFilter
            numOfApplied={numOfApplied()}
            resetFilters={resetFilters}
        >
            <SelectProductTagsForFiltering
                ids={tagIds ?? []}
                setIds={setTagIds}
            />
            <SelectCategoriesForFiltering
                ids={categoryIds ?? []}
                setIds={setCategoryIds}
            />
            <SelectBrandsForFiltering
                ids={brandIds ?? []}
                setIds={setBrandIds}
            />
            <SelectCharacteristicValuesForFiltering
                ids={characteristicValueIds ?? []}
                setIds={setCharacteristicValueIds}
            />
            <SelectColorsForFiltering
                ids={colorIds ?? []}
                setIds={setColorIds}
            />
            <ComboboxSubItemForArrayValues
                options={[
                    {
                        label: 'Мужской',
                        value: 'MALE',
                    },
                    {
                        label: 'Женский',
                        value: 'FEMALE',
                    },
                    {
                        label: 'Унисекс',
                        value: 'UNISEX',
                    },
                ]}
                setValues={setGenders}
                title='Пол'
                values={productGenders ?? []}
            />
            <ComboboxSubItemForArrayValues
                options={[
                    {
                        label: 'Зима',
                        value: 'WINTER',
                    },
                    {
                        label: 'Весна-Осень',
                        value: 'SPRING_FALL',
                    },
                    {
                        label: 'Лето',
                        value: 'SUMMER',
                    },
                    {
                        label: 'Всесезон',
                        value: 'ALL_SEASON',
                    },
                ]}
                setValues={setSeasons}
                title='Сезон'
                values={productSeasons ?? []}
            />
            <DropdownMenuSeparator />
            <IsArchivedSwitch
                setIsArchived={setIsArchived}
                isArchived={isArchived ? Boolean(isArchived) : false}
            />
        </DropdownFilter>
    )
}
